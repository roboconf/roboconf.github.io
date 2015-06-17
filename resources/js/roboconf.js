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
    
    // = <span class="value">something</span>
    text = text.replace( /=(\s*)([^,;]+)/ig, '=$1<span class="value">$2</span>' );
    
    // <span class="comment"># a comment</span>
    text = text.replace( /(#[^\n]*)/ig, '<span class="comment">$1</span>' );
    
    // <span class="property">instance of</span>
    text = text.replace( /\b(instance of)\b/ig, '<span class="property">$1</span>' );
    
    // <span class="property">facet</span>
    text = text.replace( /([^ ])(facet) /ig, '$1<span class="property">$2</span> ' );
    
    // <span class="property">import</span>
    text = text.replace( /\b(import)\b/ig, '<span class="property">$1</span>' );
    
    // <span class="property">name:</span>
    text = text.replace( /\b([^:\n]+:)/ig, '<span class="property">$1</span>' );
    
    // <span class="value">(optional)</span>
    text = text.replace( /\(([^)]*)\)/ig, '(<span class="value">$1</span>)' );
    $( this ).html( text );
  });
}

$( window ).ready( formatRoboconfSnippets );
