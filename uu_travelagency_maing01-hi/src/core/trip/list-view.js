//@@viewOn:imports
import { createVisualComponent, useCallback, Utils, PropTypes, Lsi, useLsi, useRoute, useState, useSession } from "uu5g05";
import Uu5Elements, { Link, useAlertBus } from "uu5g05-elements";
import { useSystemData } from "uu_plus4u5g02";
import { ControllerProvider } from "uu5tilesg02";
import { FilterButton, SorterButton } from "uu5tilesg02-controls";
import Content from "./list-view/content";
import DataListStateResolver from "../data-list-state-resolver";
import CreateModal from "./list-view/create-modal";
import UpdateModal from "./list-view/update-modal";
import DeleteModal from "./list-view/delete-modal";
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
    const { identity } = useSession();
    const lsi = useLsi(importLsi, [ListView.uu5Tag]);
    const { data: systemData } = useSystemData();
    const { addAlert } = useAlertBus();
    const [createData, setCreateData] = useState({ shown: false });
    const [updateData, setUpdateData] = useState({ shown: false, id: undefined });
    const [deleteData, setDeleteData] = useState({ shown: false, id: undefined });
    const [, setRoute] = useRoute();

    const activeDataObjectId = updateData.id || deleteData.id;
    let activeDataObject;

    if (activeDataObjectId) {
      activeDataObject = getTripDataObject(props.tripDataList, activeDataObjectId);
    }
    debugger

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
    useCallback(() => {
      setCreateData({ shown: true });
    }, [setCreateData]);

    const handleCreate = useCallback(() => {
      setCreateData({ shown: true });
    }, [setCreateData]);

    const handleCreateDone = (trip) => {
      setCreateData({ shown: false });
      showCreateSuccess(trip);

      try {
        // HINT: The filtering and sorting is done on the server side.
        // There is no business logic about these on the client side.
        // Therefore we need to reload data to properly show new item
        // on the right place according filters, sorters and pageInfo.
        props.tripDataList.handlerMap.reload();
      } catch (error) {
        ListView.logger.error("Error creating trip", error);
        showError(error);
      }
    };

    const handleCreateCancel = () => {
      setCreateData({ shown: false });
    };

    function showCreateSuccess(trip) {
      const message = (
        <>
          <Lsi import={importLsi} path={[ListView.uu5Tag, "createSuccessPrefix"]} />

          <Link colorSchema="primary" onClick={() => handleDetail({ id: trip.id })}>
            {trip.name}
          </Link>

          <Lsi import={importLsi} path={[ListView.uu5Tag, "createSuccessSuffix"]} />
        </>
      );

      addAlert({ message, priority: "success", durationMs: 5000 });
    }

    const handleDetail = (trip) => {
      setRoute("tripDetail", { id: trip.id });
    };

    const handleUpdate = useCallback(
      (tripDataObject) => {
        setUpdateData({ shown: true, id: tripDataObject.data.id });
      },
      [setUpdateData]
    );

    const handleUpdateDone = () => {
      setUpdateData({ shown: false });
    };

    const handleUpdateCancel = () => {
      setUpdateData({ shown: false });
    };

    const handleDelete = useCallback(
      (tripDataObject) => setDeleteData({ shown: true, id: tripDataObject.data.id }),
      [setDeleteData]
    );

    const handleDeleteDone = () => {
      setDeleteData({ shown: false });
    };

    const handleDeleteCancel = () => setDeleteData({ shown: false });


    // Defining permissions
    //debugger
    const profileList = systemData.profileData.uuIdentityProfileList;
    const isAuthority = profileList.includes("Authorities");
    const isExecutive = profileList.includes("Executives");
    function isOwner(trip) {
      return identity?.uuIdentity === trip.uuIdentity;
    }

    const tripsPermissions = {
      trip: {
        canCreate: () => isAuthority || isExecutive || true,
        canManage: (trip) => isAuthority || (isExecutive && isOwner(trip)),
      },
    };
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    const actionList = getActions(props, tripsPermissions, { handleCreate });

    return (
      <>
        {createData.shown && (
          <CreateModal
            tripDataList={props.tripDataList}
            locationDataList={props.locationDataList}
            shown={true}
            onSaveDone={handleCreateDone}
            onCancel={handleCreateCancel}
          />
        )}
        {updateData.shown && (
          <UpdateModal
            tripDataObject={activeDataObject}
            locationDataList={props.locationDataList}
            onSaveDone={handleUpdateDone}
            onCancel={handleUpdateCancel}
            shown
          />
        )}
        {/* HINT: We need to check activeDataObject only for DeleteModal because deleteData.shown is true
            for brief moment after dataObject removal from dataList (2 separated state values) */}
        {deleteData.shown && activeDataObject && (
          <DeleteModal
            tripDataObject={activeDataObject}
            onDeleteDone={handleDeleteDone}
            onCancel={handleDeleteCancel}
            shown
          />
        )}
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
                  tripsPermissions={tripsPermissions}
                  onLoadNext={handleLoadNext}
                  onDetail={handleDetail}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
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

function getTripDataObject(tripDataList, id) {
  // HINT: We need to also check newData where are newly created items
  // that don't meet filtering, sorting or paging criteria.
  const item =
    tripDataList.newData?.find((item) => item?.data.id === id) ||
    tripDataList.data.find((item) => item?.data.id === id);

  return item;
}
function getActions(props, tripsPermissions, { handleCreate }) {
  const buttonsDisabled = props.tripDataList.state !== "ready" || props.locationDataList.state !== "ready"
  const actionList = [];

  if (props.tripDataList.data) {
    actionList.push({
      component: FilterButton,
    });

    actionList.push({
      component: SorterButton,
    });
  }

  if (tripsPermissions.trip.canCreate()) {
    actionList.push({
      icon: "mdi-plus",
      children: <Lsi import={importLsi} path={[ListView.uu5Tag, "createTrip"]} />,
      primary: true,
      onClick: handleCreate,
      disabled: buttonsDisabled,
    });
  }

  return actionList;
}
//@@viewOff:helpers

//@@viewOn:exports
export { ListView };
export default ListView;
//@@viewOff:exports
