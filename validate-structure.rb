#!/usr/bin/ruby


# We use Ruby as this script is executed on Travis CI
# with a Ruby configuration (Jekyll, our web site generator, is a Ruby gem).


# The following assertions are verified:
# - All the files referenced in "_data/*.yml" files exist.
# - Referenced MD files have the right layout.
# - Referenced MD files have the right ID.
# - Referenced MD files have a title (not empty).
# - Referenced MD files have the right declaration of menus.
# - Referenced MD files have the right header (properties sorted correctly).
# - Keys in MD files have the right formatting (no trailing space, right indentation).
# - Data files do not contain duplicate keys.
# - All the MD files are referenced in the data files.

require 'set'


# Verifies a *.md file.
#
# *Args*    :
#   - +id+ -> the expected page's ID
#   - +cat+ -> the expected page's category
#   - +lang+ -> the language (also matching a directory name, e.g. "en", "fr")
#   - +location+ -> the relative file path under the language directory
# * *Returns* :
#   - nil if no error was found, a string otherwise
#     (can be empty if the message was logged directly in the function)
#
def verify_md_file(id, cat, lang, location)

  fullLocation = './' + lang + '/' + location + '.md'

  # Hack: some pages are linked from several data files.
  # So, verification can only work from one data file.
  prefixes = {
    './fr/guide-utilisateur/' => 'ug-last',
    './fr/guide-developpeur/' => 'dg-snapshot',
    './en/user-guide/user-guide.md' => 'ug-last',
    './en/developer-guide/developer-guide.md' => 'dg-last'
  }

  # For these exceptions, we skip some checks.
  prefixes.each do |key, value|
    if fullLocation.start_with?(key) && ! cat.eql?(value)
      return nil
    end
  end
  
  # The MD file must exist
  if ! File.file?(fullLocation)
    return 'File ' + fullLocation + ' does not exist.'
  end

  # Parse its content
  File.foreach(fullLocation).with_index do |line, line_num|

    # Do not go beyond 7
    if line_num > 7
      break
    end

    # Remove the line break at the end of the line
    line = line.chomp()

    # Lines 0 and 6 must be '---'
    if (line_num % 6 == 0) && ! line.eql?('---')
      output_error('--- was expected.', fullLocation, line_num)
      return ''
    end

    # Title
    if line_num == 1
      match = /title: "([^"]+)"/i.match(line)
      if ! match
        output_error('The title attribute is missing or is invalid.', fullLocation, line_num)
        return ''
      end
    end

    # Layout
    if line_num == 2 && ! line.eql?('layout: page')
      output_error('The layout attribute is missing or invalid. "layout: page" was expected.', fullLocation, line_num)
      return ''
    end

    # Category
    if line_num == 3 && ! line.eql?('cat: "' + cat + '"')
      output_error('Invalid category. cat: "' + cat + '" was expected.', fullLocation, line_num)
      return ''
    end

    # Id
    if line_num == 4 && ! line.eql?('id: "' + id + '"')
      output_error('Invalid ID. "id: "' + id + '" was expected.', fullLocation, line_num)
      return ''
    end

    # Menu
    if line_num == 5
      version = cat.gsub('ug-', '').gsub('dg-', '').gsub('-', '.')
      escapedVersion = version.gsub('.', '\.')

      pattern = '';
      if version.eql?('last') || version.eql?('main')
        pattern = /menus: \[ "([^"]+)", "[^"]+" \]/
      elsif version.eql?('snapshot')
        pattern = /menus: \[ "([^"]+)", "[^"]+", "Snapshot" \]/
      else
        pattern = Regexp.new('menus: \[ "([^"]+)", "[^"]+", "' + escapedVersion + '" \]')
      end

      match = pattern.match(line)
      if ! match
        output_error('Invalid menu declaration. Respect the formatting and the spaces. Expected version: ' + version, fullLocation, line_num)
        return ''
      end

      menu = match.captures[0]
      if menu != 'users' && menu != 'developers' && menu != 'project'
        output_error('Invalid menu. "users", "developers" or "project" were expected. Found: ' + menu, fullLocation, line_num)
        return ''
      end
    end

    # Empty line (for readability)
    if line_num == 7 && ! line.empty?()
      output_error('The 7th line must be empty (source readability).', fullLocation, line_num)
      return ''
    end
  end
end

# Outputs an error.
#
# *Args*    :
#   - +msg+ -> an error message
#   - +file+ -> the file that contains an error
#   - +line_num+ -> the line number
# * *Returns* :
#   - true
def output_error(msg, file, line_num)
  loc = file + ', line ' + (line_num + 1).to_s + ': '
  printf "%-90s %s\n", loc, msg
  return true 
end


#
# Standard script
#

# No error assumed
error = false

# List of all the MD files
allFoundMdFiles = Set.new()

# Read all the data files
for dataFile in Dir['./_data/*.yml'] do

  allKeys = Set.new()
  prefix = ''
  key = ''
  File.foreach(dataFile).with_index do |line, line_num|

    # Remove the line break at the end of the line
    line = line.chomp()

    # Category deduced from the file name
    cat = File.basename(dataFile, ".yml")

    # Skip comments and empty lines
    if line.start_with?('#') || line.empty?()
      key = ''
      next
    end

    # Key?
    if ! line.start_with?('  ')

      # Keys are not indented and end with a colon
      if ! line.end_with?(':')
        error = output_error('Invalid key declared, a colon is missing at the end.', dataFile, line_num)
        next
      end

      key = line[0..-2]
      if allKeys.include?(key)
        error = output_error('Key "' + key + '" was defined more than once.', dataFile, line_num)
        next
      end

      allKeys.add(key)

    # Value expected?
    elsif key.empty?()
      error = output_error('A key was expected. A value was found instead.', dataFile, line_num)
      next

    # Process the value
    else
      my_match = /  ([^ :]+): (\S+)/.match(line)
      if ! my_match
        error = output_error('A value was found but the syntax is invalid.', dataFile, line_num)
        next
      end

      # Extract the important parts      
      groups = my_match.captures

      # FIXME: remove or update this check once we have more languages
      if groups[0] != 'fr' && groups[0] != 'en'
        error = output_error('Invalid language. "fr" or "en" were expected.', dataFile, line_num)
        next
      end

      # Add the file to the list of found ones
      fullLocation = './' + groups[0] + '/' + groups[1] + '.md'
      allFoundMdFiles.add(fullLocation)

      # Verify the file content
      error = verify_md_file(key, cat, groups[0], groups[1])
      if error != nil 
        if ! error.empty?()
          error = output_error(error, dataFile, line_num)
        end

        error = true
        next
      end
    end
  end
end

# Verify all the MD files were listed in the data file
Dir['./**/*.md'].each do |file_name|

  # Exclude some files from the check.
  # FIXME: there should be no exclusion!
  if file_name.start_with?('./slides/') ||
      file_name.start_with?('./_site/') ||
      file_name.match(/\.\/[^\/]+\/index\.md/) ||
      file_name.eql?('./readme.md') ||
      file_name.start_with?('./fr/tutoriel-developpez-com/')
     next
  end

  # Not found?
  if ! allFoundMdFiles.include?(file_name)
    puts file_name + ' is not referenced in any data file.'
    error = true
  end 
end

# Exit code
if error
  exit(1)
end
