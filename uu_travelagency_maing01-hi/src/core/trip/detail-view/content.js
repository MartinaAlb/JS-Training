//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, Utils, Lsi, useLanguage, PropTypes, useEffect, useLsi } from "uu5g05";
import { Box, Line, Text, DateTime, useSpacing } from "uu5g05-elements";
import { PersonPhoto } from "uu_plus4u5g02-elements";
import Config from "./config/config";
import importLsi from "../../../lsi/import-lsi";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  image: () =>
    Config.Css.css({
      display: "block",
      maxWidth: "35%",
      margin: "auto",
    }),

  text: ({ spaceA, spaceB }) =>
    Config.Css.css({
      display: "block",
      marginLeft: spaceA,
      marginRight: spaceA,
      marginTop: spaceB,
      marginBottom: spaceB,
    }),

  infoLine: ({ spaceA, spaceC }) =>
    Config.Css.css({
      display: "block",
      marginLeft: spaceA,
      marginTop: spaceC,
    }),

  footer: ({ spaceA, spaceB, spaceC }) =>
    Config.Css.css({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",

      marginTop: spaceC,
      paddingTop: spaceB,
      paddingBottom: spaceB,
      paddingLeft: spaceA,
      paddingRight: spaceA,
    }),

  photo: ({ spaceC }) =>
    Config.Css.css({
      marginRight: spaceC,
    }),
};
//@@viewOff:css

const Content = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Content",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    tripDataObject: PropTypes.object.isRequired,
    locationDataList: PropTypes.object.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const lsi = useLsi(importLsi, [Content.uu5Tag]);
    const { tripDataObject } = props;

    const spacing = useSpacing();
    const [language] = useLanguage();

    function buildLocationNames() {
      // for faster lookup
      let locationIds = new Set(trip.locationId);
      return props.locationDataList.data
        .reduce((acc, { data: location }) => {
          if (locationIds.has(location.id)) {
            acc.push(location.name);
          }
          return acc;
        }, [])
        .join(", ");
    }

    function getRatingCountLsi(ratingCount) {
      const pluralRules = new Intl.PluralRules(language);
      const rule = pluralRules.select(ratingCount);
      return Utils.String.format(lsi[`${rule}Votes`], ratingCount);
    }

    useEffect(() => {
      if (
        tripDataObject.data.image &&
        !tripDataObject.data.imageUrl &&
        tripDataObject.state === "ready" &&
        tripDataObject.handlerMap?.getImage
      ) {
        tripDataObject.handlerMap.getImage(trip).catch((error) => console.error(error));
      }
    }, [tripDataObject]);
    //@@viewOff:private

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    const trip = tripDataObject.data;
    const departureDate = new Date(trip.departureDate);
    const arrivalDate = new Date(departureDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    return (
      <div {...attrs}>
        {trip.text && (
          <Text
            category="interface"
            segment="content"
            type="medium"
            colorScheme="building"
            className={Css.text(spacing)}
          >
            {trip.text}
          </Text>
        )}

        {trip.imageUrl && <img src={trip.imageUrl} alt={trip.name} className={Css.image()} />}

        <Line significance="subdued" />

        {trip.locationIdList?.length > 0 && <InfoLine>{buildLocationNames()}</InfoLine>}

        <div>
          <InfoLine>
            Date of departure <DateTime value={departureDate} dateFormat="short" timeFormat="none" />
          </InfoLine>
          <InfoLine>
            Date of arrival <DateTime value={arrivalDate} dateFormat="short" timeFormat="none" />
          </InfoLine>
        </div>



        <Box significance="distinct" className={Css.footer(spacing)}>
          <span>
            <>

              <Text category="interface" segment="content" colorScheme="building" type="medium">
                {trip.capacity}
              </Text>

              <Text category="interface" segment="content" colorScheme="building" type="medium">
                {trip.pricePerPerson}
              </Text>
            </>
          </span>
        </Box>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function InfoLine({ children }) {
  const spacing = useSpacing();

  return (
    <Text
      category="interface"
      segment="content"
      type="medium"
      significance="subdued"
      colorScheme="building"
      className={Css.infoLine(spacing)}
    >
      {children}
    </Text>
  );
}
//@@viewOff:helpers

export default Content;
