( function() {

    function toArray( data, keys ) {

        return keys.map( key => data[ key ] );

    }
    function fromArray( arr, keys ) {

        return keys.reduce( function( obj, key, index ) {

            return Object.assign( {}, obj, { [ key ]: arr[ index ] } )

        }, {} );

    }
    var schemaVersion = 1;
    var baseKeys = [ "type", "frameMaterial", "topFiller", "interior" ];
    var dimensionKeys = [ "width", "height" ];
    var doorKeys = [ "type", "panelMaterials", "interior" ];

    function encode( data ) {

        if (typeof data !== "object" ) data = JSON.parse( data );
        var basic = toArray( data, baseKeys )
        var dimensions = toArray( data.dimensions || {}, dimensionKeys );
        var doors = ( data.doors || [] ).map( door => toArray( door, doorKeys ) );
        return JSON.stringify( [ schemaVersion, basic, dimensions, doors ] );

    }
    function decode( data ) {

        if ( typeof data !== "object" ) data = JSON.parse( data );
        var dataSchemaVersion = data[ 0 ];
        return JSON.stringify( Object.assign(
            fromArray( data[ 1 ], baseKeys ),
            {
                dimensions: fromArray( data[ 2 ], dimensionKeys ),
                doors: data[ 3 ].map( arr => fromArray( arr, doorKeys ) )
            }
        ), null, 3 );

    }
    window.addEventListener( "DOMContentLoaded", () => {

        fetch( "/samples/basic.json" ).then( resp => resp.json() ).then( json => raw.value = JSON.stringify( json, null, 3 ) );

    } );
    window.redPotEncode = encode;
    window.redPotDecode = decode;

}() );