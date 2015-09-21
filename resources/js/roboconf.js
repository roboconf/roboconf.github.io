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
      before = before.replace( /=(\s*)([^,;]+)/ig, '=$1<span class="value">$2</span>' );
      
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
      before = before.replace( /\b(external)\b/ig, '(<span class="value">$1</span>)' );
      
      // Update the result
      result += before + after + '\n';
    });
    
    $( this ).html( result.trim());
  });
}

$( window ).ready( formatRoboconfSnippets );
