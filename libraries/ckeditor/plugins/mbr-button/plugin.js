// register plugin
CKEDITOR.plugins.add( 'mbr-button',
{
	init: function( editor )
	{
		var iconPath = this.path + 'images/icon.png';

		editor.addCommand( 'mbr-buttonDialog', new CKEDITOR.dialogCommand( 'mbr-buttonDialog' ) );

		editor.on( 'doubleclick', function( evt )
         {
            var element = CKEDITOR.plugins.link.getSelectedLink( editor ) || evt.data.element;

            if ( !element.isReadOnly() )
            {
               if ( element.is( 'mbr-btn' ) )
               {
                  editor.execCommand( 'mbr-buttonDialog' )
               }
            }
         });


		// create toolbar icon
		// editor.ui.addButton( 'Button',
		// {
		// 	label: 'Insert Button',
		// 	command: 'mbr-buttonDialog',
		// 	icon: iconPath
		// } );


		// button dialog
		CKEDITOR.dialog.add( 'mbr-buttonDialog', function ( editor )
		{
			return {
				title : 'Button Properties',
				minWidth : 300,
				minHeight : 150,
		 
				contents :
				[
					{
						id : 'tab1',
						label : 'Basic Settings',
						elements :
						[
							{
								type : 'text',
								id : 'text',
								label : 'Text',
								validate : CKEDITOR.dialog.validate.notEmpty( "Abbreviation field cannot be empty" ),
								setup : function( element )
								{
									this.setValue( element.getText() );
								},
								commit : function( element )
								{
									element.setText( this.getValue() );
								}
							},
							{
								type : 'text',
								id : 'href',
								label : 'Link',
								validate : CKEDITOR.dialog.validate.notEmpty( "Explanation field cannot be empty" ),
								setup : function( element )
								{
									this.setValue( element.getAttribute( "href" ) );
								},
								commit : function( element )
								{
									element.setAttribute( "href", this.getValue() );
									element.setAttribute( "class", "btn btn-default" );
								}
							},
							{
								type : 'select',
								id : 'btn-color',
								label : 'Color',
								items : 
								[
									[ 'Default', 'btn-default' ],
									[ 'Primary', 'btn-primary' ],
									[ 'Success', 'btn-success' ],
									[ 'Info', 'btn-info' ],
									[ 'Warning', 'btn-warning' ],
									[ 'Danger', 'btn-danger' ],
									[ 'Link', 'btn-link' ]
								],
								'default' : 1,
								setup : function( element )
								{
									var className = element.getAttribute( "class" ).split(' ');
									if( className ) for(var k in className) {
										if(className[k] != 'btn' &&
											className[k] != 'btn-lg' &&
											/btn-/g.test( className[k] ) ) {

											this.setValue( className[k] );
											return;
										}
									}
								},
								commit : function( element )
								{
									element.setAttribute( "class", "btn " + this.getValue() );
								}
							},{
								type : 'checkbox',
								id : 'btn-lg',
								label : 'Large',
								'default' : true,
								setup : function( element )
								{
									this.setValue( /btn-lg/g.test( element.getAttribute( "class" ) ) );
								},
								commit : function( element )
								{
									if( this.getValue() ) {
										element.setAttribute( "class", element.getAttribute( "class" ) + " btn-lg" );
									}
								}
							}
						]
					}
				],
				onShow : function()
				{
					var sel = editor.getSelection(),
						element = sel.getStartElement();
					if ( element )
						element = element.getAscendant( 'mbr-btn', true );
 
					if ( !element || element.getName() != 'mbr-btn' || element.data( 'cke-realelement' ) )
					{
						element = editor.document.createElement( 'mbr-btn' );
						this.insertMode = true;
					}
					else
						this.insertMode = false;
 
					this.element = element;
 
					this.setupContent( this.element );
				},
				onOk : function()
				{
					var dialog = this,
						button = this.element;
 
					if ( this.insertMode )
						editor.insertElement( button );
					this.commitContent( button );
				}
			};
		} );
	}
} );