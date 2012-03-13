  // PathJS
( function ( root, $$, $ ){
  var CURRENT  = null;
  var PREVIOUS = null;
  var ROOT     = null;
  var RESCUE   = null;
  var ROUTES   = {};


  var Route = $$.Class.extend({

    init : function ( path ){
      this.path      = path;
      this.action    = null;
      this.do_before = [];
      this.do_exit   = null;
      this.params    = {};
      ROUTES[ path ] = this;
    },

    to : function ( fn ){
      this.action = fn;
      return this;
    },

    before : function ( fns ){
      if( fns instanceof Array ){
        this.do_before = this.do_before.concat( fns );
      }else{
        this.do_before.push( fns );
      }

      return this;
    },

    exit : function ( fn ){
      this.do_exit = fn;
      return this;
    },

    partition : function (){
      var parts   = [];
      var re      = /\(([^}]+?)\)/g;
      var text;

      while( text = re.exec( this.path )){
        parts.push( text[ 1 ]);
      }

      var options = [];
      options.push( this.path.split( '(' )[ 0 ]);

      var i = 0;
      var j = parts.length;

      for( ; i < j; i++ ){
        options.push( options[ options.length - 1 ] + parts[ i ]);
      }

      return options;
    },

    // trigger
    run : function (){
      var halt_execution = false;
      var result;

      if( ROUTES[ this.path ].hasOwnProperty( 'do_before' )){
        var do_before = ROUTES[ this.path ].do_before;
        var i = 0;
        var j = do_before.length;

        if( j > 0 ){
          for( ; i < j; i++ ){
            result = do_before[ i ]();
            if( result === false ){
              halt_execution = true;
              break;
            }
          }
        }
      }

      if( !halt_execution ){
        ROUTES[ this.path ].action();
      }
    }
  });



  var Path = {

    map : function ( path ){
      return ROUTES.hasOwnProperty( path ) ?
        ROUTES[ path ] : new Route( path )
    },

    root : function ( path ){
      ROOT = path;
    },

    rescue : function ( fn ){
      RESCUE = fn;
    },

    match : function ( path, parameterize ){
      var params = {};
      var route  = null;
      var possible_routes, i, j, k, l, slice, slice_tmp, compare, compare_tmp;

      for( route in ROUTES ){
        if( route !== null && route !== undefined ){
          route           = ROUTES[ route ];
          possible_routes = route.partition();

          j = 0
          k = possible_routes.length;

          for( ; j < k; j++ ){
            slice   = possible_routes[ j ];
            compare = path;

            if( slice.search( /:/ ) > 0 ){
              slice_tmp   = slice.split( '/' );
              compare_tmp = compare.split( '/' );
              i = 0
              l = slice_tmp.length;

              for( ; i < l; i++ ){
                if(( i < compare_tmp.length ) && ( slice_tmp[ i ].charAt( 0 ) === ':' )){
                  params[ slice_tmp[ i ].replace( /:/, '' )] = compare_tmp[ i ];
                  compare = compare.replace( compare_tmp[ i ], slice_tmp[ i ]);
                }
              }
            }

            if( slice === compare ){
              if( parameterize ){
                route.params = params;
              }

              return route;
            }
          }
        }
      }

      return null;
    },

    dispatch : function ( passed_route ){
      var previous, matched;

      if( CURRENT !== passed_route ){
        PREVIOUS = CURRENT;
        CURRENT  = passed_route;
        matched  = Path.match( passed_route, true );

        if( PREVIOUS ){
          previous = Path.match( PREVIOUS );

          if( previous !== null && previous.do_exit !== null ){
            previous.do_exit();
          }
        }

        if( matched !== null ){
          matched.run();
          return true;
        }else{
          if( RESCUE !== null ){
            RESCUE();
          }
        }
      }
    },

    listen : function (){
      var doc_mode = document.documentMode;

      var fn = function (){
        Path.dispatch( location.hash );
      }

      if( location.hash === '' && ROOT !== null ){
        location.hash = ROOT;
      }

      // The 'document.documentMode' checks below ensure that PathJS fires the right events
      // even in IE 'Quirks Mode'.
      if( 'onhashchange' in window && ( !doc_mode || doc_mode > 7 )){
        window.onhashchange = fn;
      }else{
        setInterval( fn, 50 );
      }

      if( location.hash !== '' ){
        Path.dispatch( location.hash );
      }
    }
  };



  var History = {

    pushState : function ( state, title, path ){
      if( this.supported ){
        if( Path.dispatch( path )){
          history.pushState( state, title, path );
        }
      }else{
        if( this.fallback ){
          window.location.hash = '#' + path;
        }
      }
    },

    popState : function ( event ){
      Path.dispatch( document.location.pathname );
    },

    listen : function ( fallback ){
      this.supported = !!( window.history && window.history.pushState );
      this.fallback  = fallback;

      if( this.supported ){
        window.onpopstate = this.popState;
      }else{
        if( this.fallback ){
          for( route in ROUTES ){
            if( route.charAt( 0 ) != '#' ){
              ROUTES[ '#' + route ]      = ROUTES[ route ];
              ROUTES[ '#' + route ].path = '#' + route;
            }
          }

          Path.listen();
        }
      }
    }
  };
})( this, WHISKY, jQuery || Zepto );