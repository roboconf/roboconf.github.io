/**
 * Moves the footer at the bottom of the window (no matter the window's height).
 */
function moveFooter() {
  var footer = $( "#footer" );

  // See style.css.
  // We cannot get it dynamically because this function is also used on resize events.
  var marginTop = 18;
  var newMarginTop = $( window ).height() - footer.position().top - footer.height() - marginTop;
  if( newMarginTop > 10 ) {
    footer.css( 'margin-top', newMarginTop + 'px' );
  }
}


$( window ).ready( moveFooter );
$( window ).resize( moveFooter );

/**
 * Manage the search bar.
 */
function switchSearchBar() {
  $( '#search-bar' ).fadeToggle('fast');
  return false;
}

function openSearchPage(e) {

  var code = e.which;
  if( code === 13 ) {
    e.preventDefault();
    var query = $( '#search-bar' ).val();
    query = encodeURIComponent( query ).replace( /%20/g, '+' );
    window.location = 'https://duckduckgo.com/?q=' + query + '+site%3Aroboconf.github.io&t=hs&ia=web', '_blank';
  }

  return false;
}

/**
 * Formats Roboconf code snippets.
 */
function formatRoboconfSnippets() {

  $( '.language-roboconf' ).each( function( index ) {
    var text = $( this ).text().trim();

    var result = '';
    text.split( '\n' ).forEach( function( line, index, arr ) {
      var pos = line.indexOf( '#' );
      var before, after;

      // Split the line
      if( pos >= 0 ) {
        before = line.substring( 0, pos );
        after = line.substring( pos );
      } else {
        before = line;
        after = '';
      }

      // Make replacements
      // <span class="comment"># a comment</span>
      after = after.replace( /(#[^\n]*)/ig, '<span class="comment">$1</span>' );

      // = <span class="value">something</span>
      //before = before.replace( /=(\s*)([^,;]+)/ig, '=$1<span class="value">$2</span>' );

      // <span class="property">instance of</span>
      before = before.replace( /\b(instance of)\b/ig, '<span class="property">$1</span>' );

      // <span class="property">facet</span>
      before = before.replace( /\b(facet)\b/ig, '<span class="property">$1</span>' );

      // <span class="property">import</span>
      before = before.replace( /\b(import)\b/ig, '<span class="property">$1</span>' );

      // <span class="property">name:</span>
      before = before.replace( /\b([^:\n]+:)/ig, '<span class="property">$1</span>' );

      // <span class="value">(optional)</span>
      before = before.replace( /\(([^)]*)\)/ig, '(<span class="value">$1</span>)' );

      // <span class="value">external</span>
      before = before.replace( /\b(external)\b/ig, '<span class="value">$1</span>' );

      // <span class="value">random[port]</span>
      before = before.replace( /\b(random\[port\]) /ig, '<span class="value">$1</span> ' );

      // Update the result
      result += before + after + '\n';
    });

    $( this ).html( result.trim());
  });
}

/**
 * Formats Roboconf commands.
 */
function formatRoboconfCommandsSnippets() {

  $( '.language-roboconf-commands' ).each( function( index ) {
    var text = $( this ).text().trim();

    var result = '';
    text.split( '\n' ).forEach( function( line, index, arr ) {
      var pos = line.indexOf( '#' );
      var before, after;

      // Split the line
      if( pos >= 0 ) {
        before = line.substring( 0, pos );
        after = line.substring( pos );
      } else {
        before = line;
        after = '';
      }

      // Make replacements
      // <span class="comment"># a comment</span>
      after = after.replace( /(#[^\n]*)/ig, '<span class="comment">$1</span>' );
      after = after.replace( /(@parameter)/ig, '<i>$1</i>' );

      // Update the result
      result += before + after + '\n';
    });

    // Highlight keywords (as global replacements - commands can include line breaks anywhere)
    result = result.replace( /(^deploy and start all)/igm, '<span class="keyword">$1</span>' );
    result = result.replace( /(^stop all)/igm, '<span class="keyword">$1</span>' );
    result = result.replace( /(^undeploy all)/igm, '<span class="keyword">$1</span>' );
    result = result.replace( /(^delete)/igm, '<span class="keyword">$1</span>' );

    result = result.replace( /(^change status of)\s+(.*)\s+(to)/igm, '<span class="keyword">$1</span> $2 <span class="keyword">$3</span>' );
    result = result.replace( /(^rename)\s+(.*)\s+(as)/igm, '<span class="keyword">$1</span> $2 <span class="keyword">$3</span>' );
    result = result.replace( /(^associate)\s+(.*)\s+(with)/igm, '<span class="keyword">$1</span> $2 <span class="keyword">$3</span>' );
    result = result.replace( /(^replicate)\s+(.*)\s+(as)/igm, '<span class="keyword">$1</span> $2 <span class="keyword">$3</span>' );
    result = result.replace( /(^create)\s+(.*)\s+(as)\s+(.*)\s+(under)/igm, '<span class="keyword">$1</span> $2 <span class="keyword">$3</span> $4 <span class="keyword">$5</span>' );
    result = result.replace( /(^create)\s+(.*)\s+(as)/igm, '<span class="keyword">$1</span> $2 <span class="keyword">$3</span>' );
    result = result.replace( /(^define)\s+(.*)\s*=/igm, '<span class="keyword">$1</span> $2 <span class="keyword">=</span>' );
    result = result.replace( /(^write)\s+(.*)(\s*)(into)\s+(.*)/igm, '<span class="keyword">$1</span> $2$3<span class="keyword">$4</span> $5' );
    result = result.replace( /(^email)\s+(.*)(\s*)(with)\s+(.*)/igm, '<span class="keyword">$1</span> $2$3<span class="keyword">$4</span> $5' );
    result = result.replace( /(^execute)\s+(.*)/igm, '<span class="keyword">$1</span> $2' );
    result = result.replace( /(^append)\s+(.*)\s+(into)\s+(.*)/igm, '<span class="keyword">$1</span> $2 <span class="keyword">$3</span> $4' );
    result = result.replace( /(^append)\s+(into)\s+(.*)/igm, '<span class="keyword">$1</span> <span class="keyword">$2</span> $3' );

    result = result.replace( /(\$\(SMART_INDEX\))/igm, '<i>$1</i>' );
    result = result.replace( /(\$\(EXISTING_INDEX\s+MIN)/igm, '<i>$1</i>' );
    result = result.replace( /(\$\(EXISTING_INDEX\s+MAX)/igm, '<i>$1</i>' );
    result = result.replace( /(\$\(NANO_TIME\))/igm, '<i>$1</i>' );
    result = result.replace( /(\$\(MILLI_TIME\))/igm, '<i>$1</i>' );
    result = result.replace( /(\$\(UUID\))/igm, '<i>$1</i>' );

    // Line breaks
    result = result.replace( /\\/igm, '\\\n\t' );
    result = result.replace( /@n@/igm, '\\n\\' );

    // Set the new HTML content
    $( this ).html( result.trim());
  });
}

/**
 * Formats Drools rules.
 */
function formatRoboconfRulesSnippets() {

  $( '.language-roboconf-rules' ).each( function( index ) {
    var text = $( this ).text().trim();
    text = text.replace( /\b(rule)\b/igm, '<span class="keyword">$1</span>' );
    text = text.replace( /\b(when)\b/igm, '<span class="keyword">$1</span>' );
    text = text.replace( /\b(then)\b/igm, '<span class="keyword">$1</span>' );
    text = text.replace( /\b(end)\b/igm, '<span class="keyword">$1</span>' );
    text = text.replace( /\b(sleep period is)\b/igm, '<span class="attribute">$1</span>' );
    text = text.replace( /\b(time window is)\b/igm, '<span class="attribute">$1</span>' );

    // Set the new HTML content
    $( this ).html( text.trim());
  });
}

$( window ).ready( function() {
  formatRoboconfSnippets();
  formatRoboconfCommandsSnippets();
  formatRoboconfRulesSnippets();
});

/**
 * Displays the slogan extension as a periodically-updated text.
 */
function displaySloganExtension(vindex) {

  var ext = $( '#slogan-ext' );
  if (ext) {

    // Fix the text's position
    ext.css({position: 'absolute'});

    // Show the separator
    $( '#slogan-sep' ).css({display: 'inline'});

    // Update the text
    var values = ext.data('r-values');
    vindex = !vindex ? 0 : vindex;
    ext.text(values[vindex]);

    // Schedule the next update
    var nextVindex = (vindex + 1) % values.length;
    setTimeout( function() {
      displaySloganExtension(nextVindex)
    }, 1000);
  }
}
