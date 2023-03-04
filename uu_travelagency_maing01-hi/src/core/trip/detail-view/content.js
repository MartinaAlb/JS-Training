//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, Utils, Lsi, useLanguage, PropTypes, useEffect, useLsi } from "uu5g05";
import { Box, Line, Text, DateTime, useSpacing, Grid } from "uu5g05-elements";
import { PersonPhoto } from "uu_plus4u5g02-elements";
import Config from "./config/config";
import importLsi from "../../../lsi/import-lsi";
import {Icon} from "uu5g05-elements";
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
        <Line significance="subdued" />

        <Grid templateColumns={{ xs: "repeat(12, 1fr)" }}>
          <Grid.Item colSpan={4}>
            <InfoLine>
              <Icon icon={"fa-solid fa-bed"}/> {trip.location.name}
            </InfoLine>
            <InfoLine>
              <Icon icon={"mdi-earth"}/>{trip.location.country}
            </InfoLine>
            <Text
              category="interface"
              segment="content"
              type="medium"
              colorScheme="building"
              className={Css.text(spacing)}
            >
              {trip.text}
            </Text>
            <div>
              <InfoLine>
                <Icon icon="mdi-airplane-takeoff" /> <DateTime value={departureDate} dateFormat="short" timeFormat="none" />
              </InfoLine>
              <InfoLine>
                <Icon icon={"mdi-airplane-landing"}/> <DateTime value={arrivalDate} dateFormat="short" timeFormat="none" />
              </InfoLine>
              <InfoLine>
                <Icon icon={"mdi-human-greeting"}/> {trip.capacity}
              </InfoLine>
            </div>
          </Grid.Item>

          <Grid.Item colSpan={8}>
            {trip.imageUrl && <img src={trip.imageUrl} alt={trip.name} className={Css.image()} />}
          </Grid.Item>
        </Grid>

        <Box significance="distinct" className={Css.footer(spacing)}>
          <span>
              <Text category="interface" segment="content" colorScheme="building" type="medium">
                <Icon icon={"mdi-credit-card"}/> {trip.pricePerPerson} CZK
              </Text>
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

/*
<Uu5Elements.Grid
    templateColumns="repeat(2, 1fr)" // (1, 1fr)
    justifyItems="start"
    className={backgroundStyle}
  >
    {gridContent}
  </Uu5Elements.Grid>
 */
