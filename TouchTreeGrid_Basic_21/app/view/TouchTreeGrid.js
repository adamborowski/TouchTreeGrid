/*
 * File: app/view/TouchTreeGrid.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.1.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('TouchTreeGrid.view.TouchTreeGrid', {
    extend: 'Ext.Container',
    alias: 'widget.touchtreegrid',

    config: {
        listScrollable: true,
        contentItemTpl: '',
        disableSelection: true,
        onItemDisclosure: false,
        headerTpl: '',
        variableHeights: true,
        itemHeight: 47,
        disclosureProperty: 'disclose',
        listItemId: 'touchtreegridlist',
        categItemTpl: '',
        includeFooter: true,
        categIndentPct: '3',
        colNumberToTruncateForIndents: 1,
        includeFooterLevels: true,
        categDepthColors: false,
        customExpCollapseEvent: '',
        categDepthColorButtons: true,
        categItemTplOverride: '',
        contentItemTplOverride: '',
        headerTplOverride: '',
        includeHeader: true,
        applyDefaultCollapseLevel: true,
        defaultCollapseLevel: 99,
        landscapeIcon: './resources/images/Recycle.png',
        helpHtml: '',
        pressedCls: 'touchtreegrid-item-pressed',
        simpleList: false,
        columnSorting: false,
        styleContentRow: '',
        styleCategRow: '',
        styleHeaderRow: '',
        singleExpand: false,
        selectedCls: 'touchtreegrid-item-selected',
        mode: 'SINGLE',
        cls: 'x-touchtreegrid-list',
        layout: {
            type: 'fit'
        },
        store: {
            
        },
        list: {
            
        },
        columns: [
            
        ],
        header: {
            xtype: 'toolbar',
            docked: 'top',
            cls: 'touchtreegrid-header',
            maxHeight: '1.8em',
            minHeight: '1.8em'
        },
        footer: {
            xtype: 'toolbar',
            docked: 'bottom',
            ui: 'light',
            cls: 'touchtreegrid-footer'
        },
        listPlugins: {
            
        },
        categDepthColorsArr: [
            '#a6a6a6',
            '#dddddd',
            'white'
        ],
        renderers: {
            
        },
        additionalListConfigs: {
            
        }
    },

    initialize: function(config) {
        var me = this;

        me.callParent(arguments);

        this.doRefreshList();



    },

    updateColumns: function() {
        // UPDATE functions on config items execute prior to INITIALIZE (and before UPDATESTORE) so 
        // insert logic here to build ItemTpl components
        // NOTE:  Columns updated in this Class as [initialize] to force execution of this function.

        var me = this, myWidth, myWidthVal;

        var simpleList = me.getSimpleList();

        // Proceed to build TPL for header row
        var styleStr = '', rendStr='';
        var categ = me.getCategItemTplOverride();
        var indent = me.getCategIndentPct().toString(); // % of window to indent per level (starting at 0%)

        var indentCol = me.getColNumberToTruncateForIndents()-1; // This column width value will be truncated to account for indent
        // Subtract 1 from column number to array index # applied below.
        // Width expected to be in pct format as last '%' character will be stripped for computation : '25%'

        var data = me.getColumns();
        if (this.isObjectEmpty(data)) {  
            // Initialize column data for scenario where column array updated within controller after component initialization
            data ={header: '', dataIndex: '', width: '', style: '', categStyle: '', headerStyle: ''};
        }

        if (categ==='' && !simpleList) {   // Use default if not provided by user
            var shellArr = 
            [
            '<div style="display: -webkit-box; -webkit-box-orient: horizontal;'+me.getStyleCategRow()+'">',
            '<p align="left" style="width:{[(values.depth-1)*'+indent+']}%;"</p>',    // 3% per depth starting at 0% 
            '<p align="left" style="width:4%;min-width:4%;max-width:4%;white-space: nowrap;overflow:hidden;text-overflow:ellipsis;">', 
            '<span class="touchtreegrid-details-img ',
            '<tpl if="this.isExpanded(values)">',   
            'touchtreegrid-details-img-open" </span></p>',
            '<tpl else>',  
            'touchtreegrid-details-img-close" </span></p>',
            '</tpl>'
            ];


            for (var i=0; i<data.length; i++) {

                // Use categStyle if exists, else applie detail row style to category row
                if (data[i].categStyle && data[i].categStyle > '') {styleStr = data[i].categStyle;}
                else if (data[i].style) {styleStr = data[i].style;}
                else {styleStr = '';}

                // Substitute user-defined renderer string from Columns array if defined
                rendStr = ((!data[i].renderer) ? data[i].dataIndex : '[' + data[i].renderer + ']');

                if (i===indentCol) {     
                    shellArr.push('<p class="touchtreegrid-list-categ-cell" style="' +
                    'min-width:{[' + data[i].width.substr(0, data[i].width.length-1) + '-((values.depth-1)*'+indent+')]}% !important;' + 
                    'max-width:{[' + data[i].width.substr(0, data[i].width.length-1) + '-((values.depth-1)*'+indent+')]}% !important;' + 
                    'width:{[' + data[i].width.substr(0, data[i].width.length-1) + '-((values.depth-1)*'+indent+')]}% !important;' + 
                    styleStr + '" >{' + data[i].dataIndex + '}</p>');                       
                } else {           
                    shellArr.push('<p class="touchtreegrid-list-categ-cell" style="' +
                    'min-width:' + data[i].width + ' !important;' + 
                    'max-width:' + data[i].width + ' !important;' + 
                    'width:' + data[i].width + ' !important;' + 
                    styleStr + '" >{' + rendStr + '}</p>');
                }  
            }

            shellArr.push('</div>');  
            categ=shellArr.join('');
        }

        var categrows = me.setCategItemTpl(categ);

        var detail = me.getContentItemTplOverride();
        var detailArr, j;
        if (detail==='' && !simpleList) {
            detailArr = [
            '<div style="display: -webkit-box;-webkit-box-orient: horizontal;'+me.getStyleContentRow()+'">',
            '<p align="left" style="width:{[(values.depth-1)*'+indent+']}%;"</p>',    // 3% per depth starting at 0%         
            '<p align="left" style="width:4%;min-width:4%;max-width:4%;white-space: nowrap;overflow:hidden;text-overflow:ellipsis;">&nbsp;</p>'
            ];

            for (j=0; j<data.length; j++) {

                // Substitute user-defined renderer string from Columns array if defined
                rendStr = ((!data[j].renderer) ? data[j].dataIndex : '[' + data[j].renderer + ']');

                if (j===indentCol) {     
                    detailArr.push('<p class="touchtreegrid-list-content-cell" style="' +
                    'min-width:{[' + data[j].width.substr(0, data[j].width.length-1) + '-((values.depth-1)*'+indent+')]}% !important;' + 
                    'max-width:{[' + data[j].width.substr(0, data[j].width.length-1) + '-((values.depth-1)*'+indent+')]}% !important;' + 
                    'width:{[' + data[j].width.substr(0, data[j].width.length-1) + '-((values.depth-1)*'+indent+')]}% !important;' + 
                    ((data[j].style === '') ? '' : data[j].style) + '" ' +
                    '>{' + data[j].dataIndex + '}</p>');                  
                } else {           
                    detailArr.push('<p class="touchtreegrid-list-content-cell" style="' +
                    'min-width:' + data[j].width + ' !important;' + 
                    'max-width:' + data[j].width + ' !important;' + 
                    'width:' + data[j].width + ' !important;' + 
                    ((data[j].style === '') ? '' : data[j].style) + '" ' +
                    '>{' + rendStr + '}</p>');
                }          

            }

            detailArr.push('</div>');  
            detail=detailArr.join('');    
        }   
        if (detail==='' && simpleList) {
            detailArr = [
            // webkit-box handled by  "display : inline-block;" in TouchTreeGrid.css 
            //   '<div style="display: -webkit-box;-webkit-box-orient: horizontal;">',
            ];

            for (j=0; j<data.length; j++) {

                // Substitute user-defined renderer string from Columns array if defined
                rendStr = ((!data[j].renderer) ? data[j].dataIndex : '[' + data[j].renderer + ']');


                detailArr.push('<p class="touchtreegrid-simplelist-cell" style="' +
                'min-width:' + data[j].width + ' !important;' + 
                'max-width:' + data[j].width + ' !important;' + 
                'width:' + data[j].width + ' !important;' + 
                ((data[j].style === '') ? '' : data[j].style) + '" ' +
                '>{' + rendStr + '}</p>');

            }

            //   detailArr.push('</div>');  
            detail=detailArr.join('');    
        }   
        var content = me.setContentItemTpl(detail);    


    },

    updateStore: function(newStore, oldStore) {
        var me = this;

        var list = me.getList();
        var disableSel = me.getDisableSelection();
        var pressedCls = (disableSel ? '' : me.getPressedCls());  // Don't apply pressing class if selection disabled
        var selectedCls = me.getSelectedCls();
        var mode = me.getMode();
        var disclose = me.getOnItemDisclosure();
        var discloseProp = me.getDisclosureProperty();
        var itemHeight = me.getItemHeight();
        var variableHeights = me.getVariableHeights();

        if (this.isObjectEmpty(list)) {
            list = Ext.create('Ext.dataview.List', {   
                disableSelection: disableSel,
                onItemDisclosure : disclose,
                disclosureProperty : discloseProp,  // 'disclose' for all rows (default), 'leaf' for leafs only
                itemHeight: itemHeight,
                variableHeights: variableHeights,
                store: newStore,
                masked: false,
                itemCls: 'x-touchtreegrid-item',
                pressedCls : pressedCls,
                selectedCls : selectedCls,
                mode: mode
            });

            list.on('itemtap', this.onItemTap, this);

            var plugins = me.getListPlugins();
            if (!this.isObjectEmpty(plugins)) {
                list.setPlugins(plugins);
            }

            me.setList(list);

            if (!me.getListScrollable()) {
                list.setScrollable({disabled: true});  // false doesn't seem to work
            }

            var listItemId = me.getListItemId();
            if (listItemId !== '') {
                list.setItemId(listItemId);
            }

            // Update list with any additional configs defined in user-defined additionalListConfigs object
            // (this allows all configs supported by Ext.dataview.List component to be applied to TouchTreeGrid list
            // Note:  any duplicated configs already supported by TouchTreeGrid will overwrite those and could have 
            //        unexpected behaviour !!
            var addlConfigs = me.getAdditionalListConfigs();
            if (!me.isObjectEmpty(addlConfigs)) {
                for (cfg in addlConfigs) {
                    list.config[cfg] = addlConfigs[cfg];
                    list['_'+cfg] = addlConfigs[cfg];
                }
            }

            me.add(list);

        }
        else {
            list.setStore(newStore);
        }    






    },

    onItemTap: function(list, index, target, record, e) {
        /**
        * Called when an list item has been tapped
        * @param list: {Ext.List}  The subList the item is on
        * @param index: {Number} The id of the item tapped
        * @param target: {Ext.Element} The list item tapped
        * @param record: {Ext.data.Record} The record whichw as tapped
        * @param e: {Ext.event.Event} The event
        */

        var store = list.getStore(),
            node = store.getAt(index);

        if (this.getSimpleList() || node.isLeaf()) {
            this.fireEvent('leafItemTap', this, list, index, target, record, e);

        } 
        else if (this.getSingleExpand() && !node.isExpanded()) {
            // If node collapsed, then expand this one and collapse all sibling nodes
            this.fireEvent('nodeItemTap', this, list, index, target, record, e);  
            debugger; 
            node.expand(false);
            var parent = node.parentNode;
            var children = parent.childNodes;
            for (var i=0; i<children.length; i++) {
                if (children[i] !== node && children[i].isExpanded()) {
                    children[i].collapse();
                }
            }
        }
        else {
            this.fireEvent('nodeItemTap', this, list, index, target, record, e);  

            var xPosition = list.getScrollable().getScroller().position.x;
            var yPosition = list.getScrollable().getScroller().position.y;

            if (node.isExpanded()) {
                node.collapse();
            } else {
                node.expand(false);
            }

            list.getScrollable().getScroller().scrollTo(xPosition, yPosition, {duration: 0});

        }
    },

    applyHeader: function(config) {
        if (this.getIncludeHeader()) {
            Ext.apply(config, {
                docked : 'top',
                cls    : 'touchtreegrid-header',
                itemId : 'touchtreegridheader'
            });

            return Ext.factory(config, Ext.Toolbar);
        }    
    },

    updateHeader: function(header) {
        var me = this;
        if (me.getIncludeHeader()) {
            me.insert(0, header);

            if (this.getColumnSorting()) {  // add tap event listener to header toolbar
                header.element.on('tap', me["handleColumnSort"], me, {});
            }
        }    
    },

    applyFooter: function(config) {
        var me = this;

        var img = me.getLandscapeIcon();

        if (this.getIncludeFooter() && !this.getSimpleList()) {
            Ext.apply(config, {
                docked : 'bottom',
                cls    : 'touchtreegrid-footer',
                itemId : 'touchtreegridbuttons',

                items: [
                {
                    xtype: 'label',
                    docked: 'right',
                    html: '',
                    itemId: 'touchtreegridlabel',
                    cls  : 'touchtreegrid-landscape-label',                       
                    style: 'color : white'
                },            
                {
                    xtype: 'image',
                    docked: 'right',
                    hidden: true,
                    itemId: 'touchtreegridicon',
                    cls: 'touchtreegrid-landscape-icon',
                    src: img
                },
                {
                    xtype: 'segmentedbutton',
                    itemId : 'touchtreegridsegmentedbuttons',
                    items: [
                    {
                        xtype: 'button',
                        itemId: 'touchtreegridexpand',
                        cls  : 'touchtreegrid-expand-collapse-buttons',
                        text: 'Expand',
                        listeners : {
                            tap: function (button, e, options) {
                                me.doExpandDepth(99);
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        itemId: 'touchtreegridcollapse',
                        cls  : 'touchtreegrid-expand-collapse-buttons',
                        text: 'Collapse',
                        listeners : {
                            tap: function (button, e, options) {
                                me.doExpandDepth(0);
                            }
                        }
                    }
                    ]

                }]
            });




            return Ext.factory(config, Ext.Toolbar);
        }
    },

    updateFooter: function(footer) {
        if (this.getIncludeFooter() && !this.getSimpleList()) {
            this.insert(0, footer);
        }
    },

    doExpandDepth: function(depth, btn) {
        var list = this.getList(),
            store = list.getStore();

        /* Unpress Expand/Collapse buttons in event they were pressed */
        if (!Ext.isEmpty(btn)) {
            var btns  = this.down('#touchtreegridsegmentedbuttons');
            btns.setPressedButtons([]);
        }

        // Fire custom event for expand/collapse if specified
        var customEvent = this.getCustomExpCollapseEvent();
        if (customEvent !== '') {
            this.fireEvent(customEvent, {collapseLevel: depth});
            return;
        }

        store.each(function(item, index, list) {item.collapse(true);});

        function expandDepth(node) {
            if (!node.isLeaf() && node.data.depth <depth) {
                node.expand(false);

                node.childNodes.forEach(expandDepth, this);
            }
        }
        store.each(expandDepth, this);


    },

    doRefreshList: function(skipApplyDefaultCollapseLevel) {
        // Refreshes TPL in grid and in Header

        var me = this;

        var simpleList = me.getSimpleList();

        var list = me.getList();
        var disclose = me.getOnItemDisclosure();
        var colorArr = me.getCategDepthColorsArr();
        var colorDepth = me.getCategDepthColors();
        var colorDepthButtons = me.getCategDepthColorButtons();
        var itemTpl;

        // Customize TPL to change colors by category depth as defined in colorArr
        var colorStyle = (colorDepth ? 'style="background-color: {[this.depthColor(values)]} !important;"' : '');

        var tpl;
        if (!simpleList) {
            tpl = [
            '<tpl if="leaf">',
            '<div class="touchtreegrid-list-content">',
            me.getContentItemTpl(),
            '</div>',
            '<tpl else>',
            '<div class="touchtreegrid-list-categ" '+colorStyle + '>',
            me.getCategItemTpl(),
            '</div>',
            '</tpl>'
            ].join('');
        }
        else {
            tpl = [
            //    '<div class="touchtreegrid-list-content">',
            me.getContentItemTpl(),
            //   '</div>'
            ].join('');
        }

        var renderers = {};
        renderers.scope = me;
        renderers.isExpanded = function(values) {return values.expanded;};
        renderers.depthColor = function(values) {return (!colorArr[values.depth-1] ? 'white' : colorArr[values.depth-1]);};
        renderers.formatNumbers = function(n, decPlaces, prefix, thouSeparator, decSeparator) {return me.formatNumbers(n, decPlaces, prefix, thouSeparator, decSeparator);};

        var customRenderers = me.getRenderers();
        for (var prop in customRenderers) {
            renderers[prop] = customRenderers[prop];
        }

        itemTpl = Ext.create('Ext.XTemplate', tpl, renderers);

        itemTpl.compile();

        list.setItemTpl(itemTpl);

        if (simpleList) list.refresh();

        /* Build Header TPL */
        var header = me.getHeader();
        var data = me.getColumns();

        var styleStr;
        var headerTpl = me.getHeaderTplOverride();
        if (headerTpl==='') {

            var headerTplArr = [
            '<div style="display: -webkit-box;-webkit-box-orient: horizontal;'+me.getStyleHeaderRow()+'">'    
            ];
            if (!simpleList) {
                headerTplArr.push('<p align="left" style="width:4%;min-width:4%;max-width:4%;white-space: nowrap;overflow:hidden;text-overflow:ellipsis;">&nbsp;</p>');
            }

            for (var j=0; j<data.length; j++) {

                // Use headerStyle if exists, else apply detail row style to category row
                if (data[j].headerStyle && data[j].headerStyle > '') {styleStr = data[j].headerStyle;}
                else if (data[j].style) {styleStr = data[j].style;}
                else {styleStr = '';}        

                headerTplArr.push('<p class="grid-cell-hd" style="min-width:' + data[j].width +
                ';white-space: nowrap;overflow:hidden;text-overflow:clip;' +
                styleStr + '" dataIndex="'+data[j].dataIndex+'">' + data[j].header + '</p>');               
            }
            headerTplArr.push('</div>');  

            // Wrap with spacer to accomodate for disclosure icon(lines up columns better)
            var headerTplArr2 = [];
            if (disclose) {
                headerTplArr2.push('<div class="touchtreegrid-disclose-spacer">');
                headerTplArr2 = headerTplArr2.concat(headerTplArr);
                headerTplArr2.push('</div>');  
            } else {
                headerTplArr2 = headerTplArr;
            }

            headerTpl=headerTplArr2.join('');    
        }
        if (this.getIncludeHeader()) {
            header.setHtml(headerTpl);
        }    


        if (me.getApplyDefaultCollapseLevel() && !skipApplyDefaultCollapseLevel && !simpleList) {
            // custom implementations can request not to change collapse levels when refreshing
            me.doExpandDepth(me.getDefaultCollapseLevel());
        }

        if (me.getIncludeFooter() && me.getIncludeFooterLevels() && !simpleList) {
            // Proceed to add expand/collapse levels  (horizontal scrolling toolbar LATER)

            // First get total depth of treestore
            var store = list.getStore();
            maxDepth=0;

            function doDrillDown(node) {
                if (!node.isLeaf()) {
                    maxDepth = ((node.data.depth>maxDepth) ? node.data.depth : maxDepth);

                    node.childNodes.forEach(doDrillDown, me);
                }
            }
            store.each(doDrillDown, me);   

            if (maxDepth>1) {
                // Remove button items 1+ if they exist

                var btns = me.down('#touchtreegridbuttons');
                var itms = btns.getItems();
                var itmsOrigLength = itms.items.length;
                for (var k=itmsOrigLength-1; k>2; k--) {
                    btns.remove(itms.items[k], true);
                }

                var btnStyle = {};

                // Add buton for each additional level
                var newbtn;
                for (var i=2; i <= maxDepth; i++) {
                    if (colorDepth && colorDepthButtons) {
                        btnStyle = {'background' : (!colorArr[i-1] ? 'white' : colorArr[i-1]),
                        'color' : 'black'};
                    }
                    newbtn = {
                        xtype: 'button',
                        itemId: 'touchtreegriddepth'+i.toString(),
                        cls  : 'touchtreegrid-expand-collapse-buttons',
                        style : btnStyle,
                        depth : i,
                        text: i.toString(),
                        listeners : {tap: function (button, e, options) {me.doExpandDepth(button.config.depth, button);}}
                    };

                    btns.add(newbtn);
                }

            }
        }

    },

    formatNumbers: function(n, decPlaces, prefix, suffix, thouSeparator, decSeparator) {
        if (Ext.isEmpty(n)) {return n;};  // Don't format empty strings  =="" || !n || isNaN(n)
        decPlaces = (isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces);
        prefix = (prefix == undefined ? "" : prefix);   // Example pass "$" sign for currency
        suffix = (suffix == undefined ? "" : suffix);   // Example pass "%" sign for percents

        decSeparator = (decSeparator == undefined ? "." : decSeparator);
        thouSeparator = (thouSeparator == undefined ? "," : thouSeparator);
        sign = (n < 0 ? "-" : "");
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "";
        j = (((j = i.length) > 3) ? (j % 3) : 0);
        return prefix + sign + (j ? i.substr(0, j) + thouSeparator : "") + 
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + 
        (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "") + suffix;
    },

    isObjectEmpty: function(myObj) {
        for(var key in myObj) {
            if (myObj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    },

    handleColumnSort: function(e,t) {
        // Refer to updateHeader() for code to add tap listener on header toolbar
        //  header.element.on('tap', me["handleColumnSort"], me, {});

        var me        = this,
            list      = me.getList(),
            columns   = me.getColumns(),
            cNum      = columns.length,
            store     = list.getStore(),
            el        = Ext.get(t),
            headerEl  = me.down('#touchtreegridheader').element,
            dataIndex = el.getAttribute('dataIndex'),
            sorters   = store.getSorters(),
            asc       = 'x-grid-sort-asc',
            desc      = 'x-grid-sort-desc',
            c, column, colEl, sorter, dir, grouper, grouperSortProperty, grouperDirection;

        if (!dataIndex) return;  //Included in event of extra toolbar space at far right

        for (c=0; c < cNum; c++) {
            column = columns[c];
            if (column.dataIndex === dataIndex) {break;}
        }

        if (!column.sortable) return;

        grouper = store.getGrouper();
        if (!Ext.isEmpty(grouper)) {
            grouperSortProperty = grouper.getSortProperty();
            grouperDirection = grouper.getDirection();
        }    

        // Sort items within grouper if defined
        if (Ext.isEmpty(grouperSortProperty)) {
            sorter    = sorters[0];
            dir       = sorter ? sorter.getDirection() : 'ASC';
            store.sort([{property: dataIndex, direction: dir === 'DESC' ? 'ASC' : 'DESC'}]);
        } else {
            sorter    = sorters[2];  // 1st index is auto-added grouper sort,
            // 2nd index is default sorter defined in store (required for now!),
            // this 3rd index is user pressed column to sort
            dir       = sorter ? sorter.getDirection() : 'ASC';
            store.sort([{property: grouperSortProperty, direction: grouperDirection},
            {property: dataIndex, direction: dir === 'DESC' ? 'ASC' : 'DESC'}]);
        }    

        list.refresh();

        // Remove any prior sort indicators 
        for (c=0; c < cNum; c++) {
            colEl = Ext.get(headerEl.down('p.grid-cell-hd[dataIndex=' + columns[c].dataIndex + ']'));
            if (!me.isObjectEmpty(colEl)) {
                colEl.removeCls(asc);
                colEl.removeCls(desc);
            }    
        }

        // Apply sort indicator to tapped column
        el.addCls(dir === 'DESC' ? desc : asc);    

    }

});