YUI.add("gallery-icello-nodeutil-select",function(c){var a="contentBox",b="icello-nodeutil-select";OPTION_CHECKED="option:checked",SELECTED="selected",SRC_NODE="srcNode",Node=c.Node,sub=c.Lang.sub;c.namespace("Icello.NodeUtil");c.Icello.NodeUtil.Select=c.Base.create(b,c.Base,[],{BOUNDING_TEMPLATE:"<select></select>",CONTENT_TEMPLATE:null,initializer:function(){},destructor:function(){},renderUI:function(){},append:function(h){var d=this.get(a),g='<option value="{value}">{text}</option>',e=null,f=null,i=this.get(SRC_NODE);if(h.text&&!h.value){h.value=h.text;}else{if(h.value&&!h.text){h.text=h.value;}else{if(!h.value&&!h.text){throw {name:"TextAndValueNotDefinedSelectException",message:"Icello.NodeUtil.Select append: at least 'text' or 'value' must be defined in paramter 'item'"};}}}e=sub(g,h);f=Node.create(e);if(h.selected){f.set(SELECTED,true);}i.append(f);}},{ATTRS:{items:{value:[]},srcNode:{getter:function(d){if(typeof d==="string"){return c.one(d);}else{return d;}}}}});},"@VERSION@",{skinnable:false,requires:["base-build","node"]});