import { Layout } from "flexlayout-react";
import { useState } from "react";


export interface TocProps {
    layout: Layout
}

const Toc = (props: TocProps) => {

    const drag = (e: any) => {
        if (!props.layout) console.log("NULL")
        if (props.layout) {
            e.preventDefault();
            console.log("dragging");
            props.layout.addTabWithDragAndDrop(`Drop ${e.nativeEvent.srcElement.textContent} from the TOC into the centre`, {
                type: "tab",
                component: "pdf",
                name: `${e.nativeEvent.srcElement.textContent}`,
                config: {
                    "type": "pdf",
                    "uri": "https://www.ibm.com/downloads/cas/GB8ZMQZ3#view=FitH",
                    "title": "ML"
                }
            },
                (node) => {
                    console.log("drag done")
                }
            )
        }
    }



    return (<div className="container"
        onDragStart={drag}

    ><div>Doc1</div><div>Doc2</div><div>Doc3</div></div>)
}

export default Toc;