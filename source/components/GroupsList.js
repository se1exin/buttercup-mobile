import React, { Component } from "react";
import Accordion from "react-native-collapsible/Accordion";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import PropTypes from "prop-types";

const ACCORDION_ITEM_HEIGHT = 48;
const ENTRY_ICON = require("../../resources/images/entry-256.png");
const GROUP_ICON = require("../../resources/images/group-256.png");
const ICON_SIZE = ACCORDION_ITEM_HEIGHT - 8;

const styles = StyleSheet.create({
    accordionHeaderView: {
        flex: 0,
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        height: ACCORDION_ITEM_HEIGHT,
        width: "100%"
    }
    // accordionView: {
    //     width: "100%"
    // }
});

function renderHeader(section) {
    const imageLeft = 5 + (20 * this.level);
    const textLeft = imageLeft + 8;
    const textStyle = {
        flex: 1,
        marginLeft: 8
    };
    const imageStyle = {
        flex: 0,
        marginLeft: imageLeft,
        width: ICON_SIZE,
        height: ICON_SIZE
    }
    return (
        <View style={styles.accordionHeaderView}>
            <Image
                style={imageStyle}
                source={section.type === "group" ? GROUP_ICON : ENTRY_ICON}
                />
            <Text style={textStyle}>{section.title}</Text>
        </View>
    );
}

function renderSection(section) {
    const GroupsListContainer = require("../containers/GroupsList.js").default;
    return (
        <View>
            {section.type === "group" ?
                <GroupsListContainer
                    groups={section.content.groups}
                    entries={section.content.entries}
                    level={this.level + 1}
                    /> :
                <Text>Entry here</Text>
            }
        </View>
    );
}

class GroupsList extends Component {

    getSections() {
        return [
            ...this.props.groups.map(group => ({
                title: group.title,
                content: group,
                type: "group"
            })),
            ...this.props.entries.map(entry => ({
                title: entry.properties.title,
                content: entry,
                type: "entry"
            }))
        ];
    }

    render() {
        // console.log("GROUPSLIST", this.props);
        const { level } = this.props;
        const accordionStyles = {
            width: "100%"
        };
        if (level === 0) {
            accordionStyles.height = "100%";
        }
        const RootElement = (level === 0) ?
            ScrollView :
            View;
        return (
            <RootElement style={accordionStyles}>
                <Accordion
                    sections={this.getSections()}
                    renderHeader={renderHeader.bind({ level })}
                    renderContent={renderSection.bind({ level })}
                    />
            </RootElement>
        );
    }

}

GroupsList.propTypes = {
    groups:             PropTypes.arrayOf(PropTypes.object).isRequired,
    level:              PropTypes.number.isRequired
};

export default GroupsList;
