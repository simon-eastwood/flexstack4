import { Actions, DockLocation, Model, RowNode, TabNode, TabSetNode } from "flexlayout-react";
import { ModelLocation, TopModel } from "./types";

const template = {
        "global": {
        "tabSetEnableTabStrip": false,
        "tabEnableDrag": false,
        "tabEnableClose": false,
        "tabSetEnableDrop": false,
        "tabSetEnableDrag": false,
        "tabSetEnableDivide": false,
        "enableEdgeDock": false
        },
        "borders": [],
        "layout": {
            "type": "row",
            "children": [
                {
                    "type": "tabset",
                    "weight": 23.6,
                    "children": [
                        {
                            "type": "tab",
                            "name": "Left",
                                

                            "component": "sub",
                            "config": {
                                "model": {
                                    "global": {
                                        "tabSetEnableTabStrip": false,
                                        "tabSetEnableDrop": false,
                                        "tabSetEnableDrag": false,
                                        "tabSetEnableDivide": false,
                                        "tabEnableDrag": false,
                                        "enableEdgeDock": false
                                    },
                                    "borders": [],
                                    "layout": {
                                        "type": "row",
                                        "children": [
                                            {
                                                "type": "tabset",
                                                "weight": 50,
                                                "children": [
                                                    {
                                                        "type": "tab",
                                                        "name": "1111",
                                                        "component": "toc",
                                                    
                                                        "config": {
                                                            "text": "TOC"
                                                            
                                                        }
                                                    }
                                                ]
                                            },
                                                                                        {
                                               "type": "tabset",
                                                "enableTabStrip": true,
                                               
                                                "weight": 50,
                                                "children": [                                            
                                                    {
                                                        type: "tab",
                                                        component: "pdf",
                                                        name: "preview",
                                                        config: {
                                                            "type": "pdf",
                                                            "uri": "https://www.ibm.com/downloads/cas/GB8ZMQZ3#view=FitH",
                                                            "title": "ML"          
                                                        }
                                                    }
                                                ]
                                            },
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    "type": "tabset",
                     
                    "weight": 26.4,
                    "children": [
                        {
                            "type": "tab",
                            "name": "Centre",
                      
                            "component": "sub",
                            "config": {
                           
                                "model": {
                                    "global": {
                                        "tabSetEnableTabStrip": true,
                                        "tabSetEnableDrop": true,
                                        "tabSetEnableDrag": true,
                                        "tabSetEnableDivide": true,
                                        "tabEnableDrag": true,
                                        "borderBarSize": 1,
                                        "borderEnableDrop": false,
                                        "borderClassName": "myborder"
                                    },
                                    "borders": [
                                        {
                                            type: "border",
                                            location: "top",
                                            children: [
                                            
                                            ]
                                        }
                                    ],
                                    "layout": {
                                        "type": "row",
                                        "children": [
                                            {
                                                "type": "tabset",
                                                "weight": 50,
                                                "children": [
                                                    {
                                                        type: "tab",
                                                        component: "pdf",
                                                        name: "1",
                                                        config: {
                                                            "type": "pdf",
                                                            "uri": "https://www.ibm.com/downloads/cas/GB8ZMQZ3#view=FitH",
                                                            "title": "ML"          
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "tabset",
                                                "weight": 50,
                                                "children": [
                                                    {
                                                        type: "tab",
                                                        component: "pdf",
                                                        name: "2",
                                                        config: {
                                                            "type": "pdf",
                                                            "uri": "https://www.ibm.com/downloads/cas/GB8ZMQZ3#view=FitH",
                                                            "title": "ML"          
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    ],
                    "active": true
                },
                                {
                    "type": "tabset",
                    "weight": 23.6,
                    "children": [
                        {
                            "type": "tab",
                            "name": "Right",
                            "component": "sub",
                            "config": {
                                "model": {
                                    "global": {
                                        "tabSetEnableTabStrip": true,
                                        "tabSetEnableDrop": true,
                                        "tabSetEnableDrag": true,
                                        "tabSetEnableDivide": true,
                                        "enableEdgeDock": true
                                    },
                                    "borders": [],
                                    "layout": {
                                        "type": "row",
                                        "children": [
                                            {
                                                "type": "tabset",
                                                "weight": 50,
                                                                                              
                                                "children": [
                                                    {
                                                        "type": "tab",
                                                        "name": "1111",
                                                        "component": "text",
                                                        "config": {
                                                            "text": "Families/CCD"
                                                            
                                                        }
                                                    },
                                                             {
                                                        "type": "tab",
                                                        "name": "2222",
                                                        "component": "text",
                                                        "config": {
                                                            "text": "Families/CCD 2"
                                                            
                                                        }
                                                    }
                                                ]
                                            
                                            },
                                            
                                        ]
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        }
}

export const countTabSets = (model: Model) => {
    let cnt = 0;

    model.visitNodes((node) => {
        if (node.getType() === TabSetNode.TYPE) {
            cnt++;
        }
    });
        
    return cnt;
}


export const loadTemplateModel = () => {
    const m = Model.fromJson(template as any);

    const cnts = new Map();
    cnts.set(ModelLocation.top, countTabSets(m));
    return {
        model: m,
        nrOfTabSets: cnts
    } as TopModel
}


export const addTabSet = (model: Model) => {
     const a = Actions.addNode(  {type:"tab", component: "pdf", config:         {
            "type": "pdf",
            "uri": "https://www.ibm.com/downloads/cas/GB8ZMQZ3#view=FitH",
            "title": "ML"          
        }},  model.getRoot().getId(), DockLocation.RIGHT, 0, true)

    const n = model.doAction(a);
}


export const stringToLocation = (name: string): ModelLocation => {
    if (name.toLowerCase() === 'left') {
        return ModelLocation.left;
    } else if (name.toLowerCase() === 'centre') {
        return ModelLocation.centre;
    } else if (name.toLowerCase() === 'right') {
        return ModelLocation.right;
    } else return ModelLocation.top;
}


export const normalise = (model: Model) => {
    
    type Attrs = {
            weight?: number,
            width?: number
    };
    const attrs: Attrs = {};
    attrs.width = 999999999; // only way to clear an already-set width
    attrs.weight = 1;
  
    console.log ("Root orientation is" + model.getRoot().getOrientation() )
    model.visitNodes(node => {
        if (node.getType() === TabSetNode.TYPE || node.getType()  === RowNode.TYPE) {
        
                    const setSize = Actions.updateNodeAttributes(node.getId(), attrs);
                    model.doAction(setSize);
       
        } else if (node.getType() === TabNode.TYPE && (node as TabNode).getComponent() === 'sub') {
            normalise( (node as TabNode).getExtraData().model);
        }
    });

}