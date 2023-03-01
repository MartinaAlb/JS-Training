//@@viewOn:imports
import { createVisualComponent, useCallback, Utils, PropTypes, Lsi, useLsi } from "uu5g05";
import Uu5Elements, { useAlertBus } from "uu5g05-elements";
import { ControllerProvider } from "uu5tilesg02";
import { FilterButton, SorterButton } from "uu5tilesg02-controls";
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
    tripDataList: PropTypes.object.isRequired,
    locationDataList: PropTypes.object.isRequired,
    filterList: PropTypes.array.isRequired,
    sorterList: PropTypes.array.isRequired,
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
          await props.tripDataList.handlerMap.load(event?.data);
        } catch (error) {
          showError(error);
        }
      },
      [props.tripDataList, showError]
    );

    const handleLoadNext = useCallback(
      async (pageInfo) => {
        try {
          await props.tripDataList.handlerMap.loadNext(pageInfo);
        } catch (error) {
          showError(error);
        }
      },
      [props.tripDataList, showError]
    );
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    const actionList = getActions(props);

    return (
      <>
        <ControllerProvider
          data={props.tripDataList.data}
          filterDefinitionList={getFilters(props.locationDataList, lsi)}
          sorterDefinitionList={getSorters(lsi)}
          filterList={props.filterList}
          sorterList={props.sorterList}
          onFilterChange={handleLoad}
          onSorterChange={handleLoad}
        >
          <Uu5Elements.Block
            {...attrs}
            actionList={actionList}
            info={<Lsi import={importLsi} path={[ListView.uu5Tag, "info"]} />}
            header={<Lsi import={importLsi} path={[ListView.uu5Tag, "header"]} />}
            headerType="heading"
            card="none"
          >
            <DataListStateResolver dataList={props.tripDataList}>
              <DataListStateResolver dataList={props.locationDataList}>
                <Content
                  tripDataList={props.tripDataList}
                  locationDataList={props.locationDataList}
                  onLoadNext={handleLoadNext}
                />
              </DataListStateResolver>
            </DataListStateResolver>
          </Uu5Elements.Block>
        </ControllerProvider>
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getFilters(locationDataList, lsi) {
  let filterList = [];
  if (locationDataList.state === "ready") {
    filterList.push({
      key: "locationIdList",
      label: lsi.location,
      inputType: "select",
      inputProps: {
        multiple: true,
        itemList: locationDataList.data.map((locationDto) => ({
          value: locationDto.data.id,
          children: locationDto.data.name,
        })),
      },
    });
  }

  return filterList;
}

function getSorters(lsi) {
  return [
    {
      key: "name",
      label: lsi.name,
    },

  ];
}

function getActions(props) {
  const actionList = [];

  if (props.tripDataList.data) {
    actionList.push({
      component: FilterButton,
    });

    actionList.push({
      component: SorterButton,
    });
  }

  return actionList;
}
//@@viewOff:helpers

//@@viewOn:exports
export { ListView };
export default ListView;
//@@viewOff:exports
