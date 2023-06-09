//@@viewOn:imports
import { createComponent, useDataList, useEffect, useRef, useMemo } from "uu5g05";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

export const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const tripDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        loadNext: handleLoadNext,
        reload: handleReload,
        create: handleCreate,
      },
      itemHandlerMap: {
        delete: handleDelete,
        update: handleUpdate,
        getImage: handleGetImage,
      },
    });

    const filterList = useRef([]);
    const sorterList = useRef([]);
    const imageUrlListRef = useRef([]);

    function handleLoad(criteria) {
      filterList.current = criteria?.filterList || [];

      let sorter;
      if (criteria?.sorterList) {
        // Now uuTravelagency supports only 1 sorter per request.
        // Therefore we use the last added to the sorterList by the user.
        sorter = criteria.sorterList.at(criteria.sorterList.length - 1);
        sorterList.current = sorter ? [sorter] : [];
      } else {
        sorter = sorterList.current.at(0);
      }

      const dtoIn = getLoadDtoIn(filterList.current, sorter, criteria?.pageInfo);
      return Calls.Trip.list(dtoIn);
    }

    function handleLoadNext(pageInfo) {
      const criteria = getLoadDtoIn(filterList.current, sorterList.current, pageInfo);

      const dtoIn = { ...criteria, pageInfo };
      return Calls.Trip.list(dtoIn);
    }

    function handleReload() {
      return handleLoad({ filterList: filterList.current, sorterList: sorterList.current });
    }

    async function handleGetImage(trip) {
      const dtoIn = { code: trip.image };
      const imageFile = await Calls.Trip.getImage(dtoIn);
      const imageUrl = generateAndRegisterImageUrl(imageFile);
      return { ...trip, imageFile, imageUrl };
    }

    function generateAndRegisterImageUrl(imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      imageUrlListRef.current.push(imageUrl);
      return imageUrl;
    }

    function handleCreate(values) {
      return Calls.Trip.create(values);
    }

    async function handleUpdate(values) {
      const trip = await Calls.Trip.update(values);
      const imageUrl = values.image && generateAndRegisterImageUrl(values.image);
      return { ...trip, imageFile: values.image, imageUrl };
    }

    function handleDelete(trip) {
      const dtoIn = { id: trip.id };
      return Calls.Trip.delete(dtoIn);
    }

    useEffect(() => {
      // We don't use it to store reference on another React component
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
      return () => imageUrlListRef.current.forEach((url) => URL.revokeObjectURL(url));
      // We want to trigger this effect only once.
      // eslint-disable-next-line uu5/hooks-exhaustive-deps
    }, []);

    const value = useMemo(() => {
      return { tripDataList, filterList: filterList.current, sorterList: sorterList.current };
    }, [tripDataList]);
    //@@viewOff:private

    //@@viewOn:render
    return typeof props.children === "function" ? props.children(value) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getLoadDtoIn(filterList, sorter, pageInfo) {
  const filterMap = filterList.reduce((result, item) => {
    result[item.key] = item.value;
    return result;
  }, {});

  let dtoIn = { ...filterMap };

  if (sorter) {
    dtoIn.sortBy = sorter.key;
    dtoIn.order = sorter.ascending ? "asc" : "desc";
  }

  if (pageInfo) {
    dtoIn.pageInfo = pageInfo;
  }

  return dtoIn;
}
//@@viewOff:helpers
export default ListProvider;
