//@@viewOn:imports
import { createVisualComponent, useCallback, Utils, PropTypes, Lsi, useLsi } from "uu5g05";
import Uu5Elements, { useAlertBus } from "uu5g05-elements";
import { ControllerProvider } from "uu5tilesg02";
import Content from "./list-view/content";
import DataListStateResolver from "../data-list-state-resolver";
import Config from "./config/config";
import importLsi from "../../lsi/import-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListView",
  //@@viewOff:statics
};

const ListView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    locationDataList: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [ListView.uu5Tag]);
    const { addAlert } = useAlertBus();

    const showError = useCallback(
      (error) =>
        addAlert({
          message: error.message,
          priority: "error",
        }),
      [addAlert]
    );

    const handleLoad = useCallback(
      async (event) => {
        try {
          await props.locationDataList.handlerMap.load(event?.data);
        } catch (error) {
          showError(error);
        }
      },
      [props.locationDataList, showError]
    );

    const handleLoadNext = useCallback(
      async (pageInfo) => {
        try {
          await props.locationDataList.handlerMap.loadNext(pageInfo);
        } catch (error) {
          showError(error);
        }
      },
      [props.locationDataList, showError]
    );
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);


    return (
      <>
        <ControllerProvider
          data={props.locationDataList.data}

        >
          <Uu5Elements.Block
            {...attrs}
            actionList={actionList}
            info={<Lsi import={importLsi} path={[ListView.uu5Tag, "info"]} />}
            header={<Lsi import={importLsi} path={[ListView.uu5Tag, "header"]} />}
            headerType="heading"
            card="none"
          >
            <DataListStateResolver dataList={props.locationDataList}>

                <Content
                  locationDataList={props.locationDataList}

                  onLoadNext={handleLoadNext}
                />

            </DataListStateResolver>
          </Uu5Elements.Block>
        </ControllerProvider>
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers

//@@viewOff:helpers

//@@viewOn:exports
export { ListView };
export default ListView;
//@@viewOff:exports
