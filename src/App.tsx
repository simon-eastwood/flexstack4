import React, { useRef, useState } from 'react';
import './App.css';
import 'flexlayout-react/style/light.css'
import { Actions, DockLocation, DropInfo, Layout, Model, TabNode } from 'flexlayout-react';
import { countTabSets, loadTemplateModel, addTabSet, stringToLocation, normalise } from './Utils';
import { MAXTABSETS, ModelLocation, TopModel } from './types';
import Toc from './Toc';



function App() {
  let layoutRef: React.RefObject<Layout> = useRef(null);
  const [topModel, setTopModel] = useState<TopModel>(() => {
    return loadTemplateModel()
  });


  const updateTabsetCount = (model: Model, name: ModelLocation) => {
    const cnt = topModel.nrOfTabSets.get(name);
    const newCnt = countTabSets(model);

    if (newCnt !== cnt) {
      topModel.nrOfTabSets.set(name, newCnt);

      setTopModel({ model: topModel.model, nrOfTabSets: topModel.nrOfTabSets })
    }
  }

  const maxReached = (MAXTABSETS <= topModel!.nrOfTabSets!.get(ModelLocation.centre)!);



  const factory = (node: TabNode) => {
    var component = node.getComponent();
    if (component === "text") {
      return <div dangerouslySetInnerHTML={{ __html: '<br/><br/><br/><br/>' + node.getConfig().text }} />
    } else if (component === "toc") {
      return <Toc layout={layoutRef!.current!}></Toc>
    }
    else if (component === "pdf") {
      const iStyles = {
        height: '99%',
        width: '99%',
        overflow: 'hidden',
        border: 'none'
      }
      const cont = {
        height: '100%',
        width: '100%',
        overflow: 'hidden'
      }
      return <div style={cont}>  <iframe title=" " src={node.getConfig().uri} className="invisible-scrollbar" style={iStyles} scrolling="no" /> </div>
    }
    else if (component === "sub") {
      let model: Model = node.getExtraData().model;

      if (model == null) {
        node.getExtraData().model = Model.fromJson(node.getConfig().model);
        model = node.getExtraData().model;
        // save submodel on save event
        node.setEventListener("save", (p: any) => {
          topModel!.model.doAction(Actions.updateNodeAttributes(node.getId(), { config: { model: node.getExtraData().model.toJson() } }));
          //  node.getConfig().model = node.getExtraData().model.toJson();
        }
        );

        updateTabsetCount(model, stringToLocation(node.getName()));  // initialise count

        model.setOnAllowDrop(
          (dragNode, dropInfo) => {
            if (node.getName().toLowerCase() === 'centre' &&
              ((MAXTABSETS <= topModel!.nrOfTabSets!.get(ModelLocation.centre)!)) && dropInfo.location !== DockLocation.CENTER) {
              return false;
            } else {
              return true;
            }
          }
        )

      }

      const onSubModelChange = (model: Model) => {
        updateTabsetCount(model, stringToLocation(node.getName()));
      }

      if (node.getName().toLowerCase() === 'centre') {
        console.log("layout is " + layoutRef);
        return <Layout ref={layoutRef} model={model} onModelChange={onSubModelChange} factory={factory} />;
      } else {
        return <Layout model={model} onModelChange={onSubModelChange} factory={factory} />;
      }
    }

  }

  const modelChanged = (model: Model) => {
    updateTabsetCount(model, ModelLocation.top);
  }

  const add = (name = 'Centre') => {
    // get sub model
    topModel.model.visitNodes(node => {
      if (node.getType() === TabNode.TYPE) {
        const root: TabNode = node as TabNode;

        if (root.getComponent() === 'sub' && root.getName() === name) {
          let model: Model = root.getExtraData().model;
          let currTabsets = topModel.nrOfTabSets.get(stringToLocation(name));

          if (currTabsets && MAXTABSETS > currTabsets) {
            addTabSet(model);
          }
        }

      }

    })

  }

  const normaliseModel = () => {
    normalise(topModel.model);
  }



  return (
    <div className="outer">
      <button onClick={() => { add('Centre') }} disabled={maxReached} >
        Add Centre Tabset
      </button>
      <button onClick={normaliseModel} >
        Normalise
      </button>
      <div className="inner">
        {topModel && (
          <Layout
            model={topModel.model}
            onModelChange={modelChanged}
            factory={factory} />)}
      </div>
    </div>
  );
}

export default App;