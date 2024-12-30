'use strict';

var React = require('react');

const ErrorComponent = ({ Error, message }) => {
    return (React.createElement("span", { title: (Error === null || Error === void 0 ? void 0 : Error.stack) || "", style: { color: "red" } }, message));
};
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorMessage: "",
        };
    }
    componentDidCatch(error) {
        this.setState({
            error,
            errorMessage: error.message,
        });
    }
    render() {
        const { error, errorMessage } = this.state;
        const { Error } = this.props;
        if (error) {
            return React.createElement(Error, { error: error, message: errorMessage });
        }
        return this.props && this.props.children ? (React.createElement(React.Fragment, null, this.props.children)) : (React.createElement(React.Fragment, null, "Error"));
    }
}

const Collapsable = ({ children, label, isUseXState = true, RightHeaderContent = () => { }, }) => {
    const [open, setOpen] = React.useState(false);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { key: label, style: {
                padding: "12px 15px",
                borderTop: "1px solid rgb(232 238 231)",
                borderLeft: !open ? "4px solid #CCC" : "4px solid rgb(2, 137, 101)",
                borderImage: "initial",
                background: "rgb(250 250 250)",
                cursor: "pointer",
                fontWeight: !open ? "normal" : 700,
                color: "rgb(92 92 92)",
                textAlign: "left",
                overflow: "auto",
                position: "sticky",
                top: 0,
                zIndex: 1000002,
            }, onMouseDown: () => setOpen(!open) },
            React.createElement("span", { style: {
                    display: "inline-block",
                    paddingLeft: "5px",
                    fontSize: "16px",
                } },
                React.createElement("b", null, label)),
            " ",
            React.createElement(RightHeaderContent, { open: open })),
        React.createElement("div", { style: {
                display: open ? "block" : "none",
                padding: "10px 30px",
                background: "rgb(252, 252, 252)",
                fontSize: "14px",
                paddingBottom: "45px",
            } }, children)));
};

const ValueRenderer = ({ text, valueRef }) => {
    const [highlighted, setHighlighted] = React.useState(false);
    const [firstRender, setFirstRender] = React.useState(true);
    React.useEffect(() => {
        if (!firstRender) {
            setHighlighted(true);
            const timer = setTimeout(() => {
                setHighlighted(false);
            }, 300);
            return () => clearTimeout(timer);
        }
        else {
            setFirstRender(false);
        }
    }, [text, valueRef]);
    const highlightStyle = highlighted
        ? {
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            transition: "background-color 0s",
        }
        : {
            backgroundColor: "rgba(0, 255, 0, 0)",
            transition: "background-color 2s",
        };
    return (React.createElement("span", { title: typeof text === "string"
            ? text
            : Array.isArray(text)
                ? "Array"
                : typeof text, style: Object.assign(Object.assign({}, highlightStyle), { padding: "0px 5px", borderRadius: "4px" }) }, text === null ? (React.createElement("span", { style: { color: "orange" } }, "null")) : text === undefined ? (React.createElement("span", { style: { color: "orange" } }, "undefined")) : typeof text === "function" ? (React.createElement("b", null, "Function")) : text === "" ? (React.createElement("i", null, "''")) : typeof text === "string" ? (React.createElement("span", { style: { color: "#444" } }, text)) : ((text + "").slice(0, 100) + "" + ((text + "").length > 100 ? "..." : ""))));
};

function buildObjectOrArrayPreview(obj) {
    if (Array.isArray(obj)) {
        let val = "";
        if (obj.length > 6)
            val = "0,1,2,3,4..." + (obj.length - 1);
        if (obj.length <= 6) {
            val = "1 "
                .repeat(obj.length - 1)
                .split(" ")
                .map((a, b) => b)
                .join(",");
        }
        return "[" + val + "]";
    }
    else {
        let val = Object.keys(obj).slice(0, 5).join(", ");
        if (val.length > 10)
            val = val.substring(0, 15) + "...";
        else if (Object.keys(obj).length > 4) {
            val = val + "...";
        }
        return "{" + val + "}";
    }
}

const LabelRenderer = ({ label }) => {
    return (React.createElement("span", null, label.endsWith("[M]") ? (React.createElement("span", { title: "Modified", style: { color: "#bc7a00" } },
        label.substr(0, label.length - 3),
        " ")) : label.endsWith("[A]") ? (React.createElement("span", { title: "Added", style: { color: "green" } },
        label.substr(0, label.length - 3),
        " ")) : label.endsWith("[D]") ? (React.createElement("span", { title: "Deleted", style: { color: "#df0000" } },
        label.substr(0, label.length - 3),
        " ")) : (React.createElement("span", null, label))));
};

const Treeview = ({ state, autoOpenFirstLevel = false }) => {
    const [openList, setOpen] = React.useState([]);
    React.useEffect(() => {
        setOpen(autoOpenFirstLevel && typeof state === "object" ? Object.keys(state) : []);
    }, []);
    const toggleOpen = (key) => {
        if (openList.includes(key)) {
            setOpen(openList.filter((item) => item !== key));
        }
        else {
            setOpen([...openList, key]);
        }
    };
    return (React.createElement(ErrorBoundary, { Error: ErrorComponent },
        React.createElement("div", { style: {
                paddingLeft: "25px",
                textAlign: "left",
                paddingBottom: "2px",
                minWidth: "300px",
                height: "auto",
                transition: "height 0.3s ease",
                color: "rgb(92 92 92)",
            } },
            " ",
            Object.keys(state).length === 0 && (React.createElement("i", { style: { color: "#999" } },
                Array.isArray(state) ? "Array " : "Object ",
                " is Empty")),
            Object.keys(state)
                .filter((key) => typeof state[key] !== "function")
                .map((item, i) => {
                return typeof state[item] === "object" && state[item] !== null ? (React.createElement("div", { key: i },
                    React.createElement("div", { className: "x-devtools-treview-header", style: {
                            cursor: "pointer",
                            marginTop: "003px",
                            paddingBottom: "5px",
                            paddingLeft: "4px",
                        }, onMouseDown: () => toggleOpen(item) },
                        " ",
                        React.createElement("b", null,
                            React.createElement("span", { style: { display: "inline-block", paddingTop: "5px" } },
                                React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: "13", viewBox: "0 -960 960 960", width: "24", style: {
                                        transform: !openList.includes(item)
                                            ? "rotate(-32deg)"
                                            : "rotate(60deg)",
                                        transition: "transform ease 0.2s",
                                        marginRight: "0px",
                                        fill: "#444",
                                    } },
                                    React.createElement("path", { d: "m80-160 400-640 400 640H80Z" }))),
                            React.createElement(LabelRenderer, { label: item }),
                            " "),
                        ":",
                        " ",
                        Array.isArray(state[item]) ? (React.createElement("b", null,
                            React.createElement("i", { title: "Array", style: { color: "#555", fontSize: "12px" } },
                                React.createElement(ValueRenderer, { text: state[item].length > 0
                                        ? buildObjectOrArrayPreview(state[item])
                                        : " []", valueRef: state[item] })))) : (React.createElement("b", null,
                            React.createElement("i", { title: "Object", style: { color: "#555", fontSize: "12px" } },
                                React.createElement(ValueRenderer, { text: Object.keys(state[item]).length > 0
                                        ? buildObjectOrArrayPreview(state[item])
                                        : " {}", valueRef: state[item] }))))),
                    openList.includes(item) &&
                        state[item] &&
                        typeof state[item] === "object" && (React.createElement(Treeview, { state: state[item] })))) : (React.createElement("div", { key: i, style: { marginTop: "3px", width: "auto" } },
                    React.createElement("b", { style: { marginLeft: "10px" } },
                        React.createElement(LabelRenderer, { label: item }),
                        " "),
                    ": ",
                    React.createElement(ValueRenderer, { text: state[item] })));
            }))));
};

const StateView = ({ state, boldFont = true, autoOpenFirstLevel = false, }) => {
    return (React.createElement(ErrorBoundary, { Error: ErrorComponent },
        React.createElement("div", { style: { marginLeft: "-30px" } },
            React.createElement(Treeview, { autoOpenFirstLevel: autoOpenFirstLevel, state: state, boldFont: boldFont }))));
};

const Switch = ({ from, actualState, changeList, setChanges, previousStates = [], setIndex, index, name, maxLogCount, }) => {
    const [selectedTab, setSelectedTab] = React.useState(0);
    const tabs = ["State", "Change Logs", "prev states"];
    const spanStyle = (isSelected) => {
        return {
            border: " 1px solid #DDD",
            color: isSelected ? "white" : "#444",
            padding: "3px 10px",
            marginRight: "7px",
            borderRadius: "7px",
            background: isSelected ? "rgb(2 137 101)" : "none",
            display: "inline-block",
            verticalAlign: "top",
            width: "auto",
            textAlign: "center",
            cursor: "pointer",
        };
    };
    return (React.createElement("div", { style: { textAlign: "left" } },
        React.createElement("div", { style: {
                paddingBottom: "5px",
                width: "100%",
                margin: "0 auto",
                marginBottom: "10px",
                marginTop: "10px",
                textAlign: "center",
            } }, tabs.map((item, i) => (React.createElement("span", { key: i, onMouseDown: () => setSelectedTab(i), 
            //@ts-ignore
            style: spanStyle(selectedTab === i) },
            item,
            " ",
            i === 1 && React.createElement(ValueRenderer, { text: index }))))),
        React.createElement("div", { style: { display: selectedTab === 0 ? "block" : "none" } }, typeof actualState === "object" ? (React.createElement(StateView, { state: actualState })) : (actualState)),
        React.createElement("div", { style: { display: selectedTab === 2 ? "block" : "none" } },
            (previousStates === null || previousStates === void 0 ? void 0 : previousStates.length) > 9 && (React.createElement("span", null,
                React.createElement("i", null,
                    "only showing the last ",
                    10,
                    " previous states"))),
            typeof previousStates === "object" ? (React.createElement(StateView, { state: previousStates })) : (actualState)),
        React.createElement("div", { style: { display: selectedTab === 1 ? "block" : "none" } },
            changeList.length > 0 && (React.createElement(React.Fragment, null,
                " ",
                React.createElement("div", null,
                    " ",
                    React.createElement("span", { style: { paddingRight: "5px" } },
                        " ",
                        React.createElement("b", null, "R"),
                        "eact",
                        " "),
                    React.createElement("span", { style: { paddingRight: "5px" } },
                        React.createElement("b", null, " U"),
                        "pdate",
                        " "),
                    React.createElement("span", { style: { paddingRight: "5px" } },
                        React.createElement("b", null, " S"),
                        "et")),
                React.createElement("div", { style: { padding: "10px", marginBottom: "10px" } },
                    index > maxLogCount && (React.createElement("span", null,
                        React.createElement("i", null,
                            "only showing the last ",
                            maxLogCount,
                            " logs"))),
                    React.createElement("span", { style: {
                            float: "right",
                            textDecoration: "underline",
                            cursor: "pointer",
                        }, onClick: () => {
                            setChanges([]);
                            setIndex(0);
                        } },
                        React.createElement("i", null, "Clear Logs"))))),
            (changeList || []).map((item, key) => {
                var _a, _b, _c, _d;
                return (React.createElement("div", { key: key, style: {
                        borderBottom: "1px solid #CCC",
                    } },
                    " ",
                    (item.functionName || item.fileName) && (React.createElement("div", { style: { textAlign: "center", padding: "5px" } },
                        item.functionName,
                        " - ",
                        item.fileName)),
                    React.createElement("span", { style: { float: "right", clear: "both", paddingRight: "10px" } }, item.index),
                    " ",
                    React.createElement(StateView, { state: {
                            [item.from && item.type && item.path
                                ? "(" +
                                    ((_d = (_c = (_b = (_a = item.from) === null || _a === void 0 ? void 0 : _a.toUpperCase) === null || _b === void 0 ? void 0 : _b.call(_a)) === null || _c === void 0 ? void 0 : _c.slice) === null || _d === void 0 ? void 0 : _d.call(_c, 0, 1)) +
                                    ") " +
                                    (item.path || "*") +
                                    (item.type === "add"
                                        ? "[A]"
                                        : item.type === "update"
                                            ? "[M]"
                                            : "[D]")
                                : "*"]: item.value,
                        } })));
            })),
        React.createElement("div", { style: { marginTop: "10px" } })));
};

const useStoreExplorer = (getSetInstance, maxLogCount) => {
    const [state, setState] = React.useState(getSetInstance.getState());
    const [previousStates, setPreviousStates] = React.useState([]);
    const [changes, setChanges] = React.useState([]);
    const [index, setIndex] = React.useState(0);
    React.useEffect(() => {
        const fn = (changesList = []) => {
            if (changesList.length === 0) {
                state !== getSetInstance.getState() && changesList.push({
                    type: "update",
                    value: getSetInstance.getState(),
                    path: "*",
                    from: "set",
                });
            }
            state !== getSetInstance.getState() &&
                setPreviousStates((prev) => [state, ...prev].slice(0, 10));
            setState(getSetInstance.getState());
            changesList &&
                Array.isArray(changesList) &&
                changesList.length > 0
                ? setChanges((changes) => [
                    ...changesList.map((item) => (Object.assign(Object.assign({}, item), { index: index + 1 }))),
                    ...changes,
                ].slice(0, maxLogCount))
                : setChanges((changes) => [
                    ...compareObjects(state, getSetInstance.getState()).map((item) => (Object.assign(Object.assign({}, item), { index: index + 1 }))),
                    ...changes,
                ].slice(0, maxLogCount));
            setIndex(index + 1);
        };
        return getSetInstance.subscribe(fn, "store-explorer");
    }, [state, setState, changes, setChanges]);
    return { state, previousStates, changes, setChanges, index, setIndex };
};
function createChange(path, type, value) {
    return {
        path,
        type,
        value,
        id: Math.random().toString(),
        functionName: "",
        fileName: "",
        from: "set",
    };
}
function compareObjects(obj1, obj2) {
    const changes = [];
    // Handle updates and deletions
    Object.keys(obj1).forEach((key) => {
        if (!(key in obj2)) {
            changes.push(createChange(key, "delete"));
        }
        else if (obj1[key] !== obj2[key]) {
            changes.push(createChange(key, "update", obj2[key]));
        }
    });
    // Handle additions
    Object.keys(obj2).forEach((key) => {
        if (!(key in obj1)) {
            changes.push(createChange(key, "add", obj2[key]));
        }
    });
    return changes;
}

const CollapsableWrapper = ({ stateValue, name, maxLogCount, }) => {
    const { state: actualState, changes: changeList, setChanges, index, setIndex, previousStates, } = useStoreExplorer(stateValue, maxLogCount);
    return (React.createElement(Collapsable, { label: name, state: actualState, changeList: changeList, setChanges: setChanges, index: index, setIndex: setIndex, RightHeaderContent: ({ open }) => {
            return (!open && (React.createElement("b", { style: {
                    float: "right",
                    color: "green",
                    fontSize: "small",
                } },
                " ",
                index > 0 ? index : "")));
        } },
        React.createElement(ErrorBoundary, { Error: ErrorComponent },
            React.createElement(Switch, { changeList: changeList, setChanges: setChanges, maxLogCount: maxLogCount, index: index, 
                // from={from}
                previousStates: previousStates, setIndex: setIndex, actualState: actualState, name: name }))));
};

const DevTools = ({ stores = {}, XIconPosition = { bottom: "50px", right: "50px" }, keepOpen = false, iconColor = "rgb(233 62 44)", hideIcon = false, maxLogCount = 15, 
// from = "get-set-react",
disableToggleESCKey = false, }) => {
    const [showTools, setShowTools] = React.useState(keepOpen || false);
    React.useEffect(() => {
        function addCssToHead() {
            const cssString = `#react-store-explorer-holder{position:relative;overflow:hidden}#react-store-explorer-holder span{transition:left 0.3s,top 0.3s,width 0.3s,height 0.3s,border-radius 0.3s;position:relative;border-radius:10px!important}#react-store-explorer-holder:hover span{left:19px!important;top:19.5px!important;width:10px!important;height:10px!important}#react-store-explorer-holder:active{opacity:0.7}#react-store-explorer-holder:active span{background-color:#eee!important;width:16px!important;left:16px!important;top:16.5px!important;height:16.5px!important}`;
            const id = "234lsaoep23mohiuwelpmvonou";
            // Check if the style element with the ID already exists
            if (!document.getElementById(id)) {
                // Create a style element
                const style = document.createElement("style");
                // Set the ID and CSS text
                style.id = id;
                style.textContent = cssString;
                // Append the style element to the head
                document.head.appendChild(style);
            }
        }
        // Call the function to add the CSS to the head
        addCssToHead();
        // Clean up function to remove the style element when component unmounts
        return () => {
            var _a, _b;
            const styleElement = document.getElementById("234lsaoep23mohiuwelpmvonou");
            if (styleElement) {
                (_b = (_a = styleElement === null || styleElement === void 0 ? void 0 : styleElement.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild) === null || _b === void 0 ? void 0 : _b.call(_a, styleElement);
            }
        };
    }, []);
    React.useEffect(() => {
        function handleKeyPress(event) {
            if (event.key === "Escape") {
                setShowTools(keepOpen || !showTools);
            }
        }
        if (!disableToggleESCKey) {
            window.addEventListener("keydown", handleKeyPress);
            return () => {
                window.removeEventListener("keydown", handleKeyPress);
            };
        }
    }, [showTools, setShowTools]);
    return (React.createElement(ErrorBoundary, { Error: ErrorComponent },
        React.createElement("div", { id: "react-store-explorer-container" },
            " ",
            React.createElement("div", { id: "usex-devtools", style: {
                    lineHeight: 1.5,
                    zIndex: 1000000000,
                    height: "100%",
                    width: "420px",
                    maxWidth: "100%",
                    position: "fixed",
                    // background: "rgb(250,250,250)",
                    background: "white",
                    boxSizing: "border-box",
                    transition: "right 0.2s ",
                    top: 0,
                    right: showTools ? "0px" : "-420px",
                    color: "#444",
                    overflow: "auto",
                    boxShadow: "rgb(202 204 204) 0px 0px 10px 0px",
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI","Ubuntu", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                } },
                React.createElement("div", { style: {
                        textAlign: "center",
                        background: "white",
                        borderLeft: "1px solid #CCC",
                        padding: "10px",
                    } },
                    React.createElement("span", { style: { fontWeight: "bold", fontSize: "18px" } }, "react-store-explorer")),
                React.createElement(ErrorBoundary, { Error: ErrorComponent }, Object.keys(stores)
                    .sort()
                    .map((key) => {
                    const stateValue = stores[key];
                    return stateValue &&
                        !!stateValue.getState &&
                        !!stateValue.subscribe ? (React.createElement("div", { key: key },
                        React.createElement(ErrorBoundary, { Error: ErrorComponent },
                            React.createElement(CollapsableWrapper
                            // from={from}
                            , { 
                                // from={from}
                                maxLogCount: maxLogCount, stateValue: stateValue, name: key }),
                            " "))) : (React.createElement(React.Fragment, null));
                })),
                Object.keys(stores).length === 0 && (React.createElement("div", { style: { textAlign: "center", marginTop: "10px" } },
                    " ",
                    React.createElement("i", null, "Store is Empty")))),
            !hideIcon && (React.createElement("div", { onMouseDown: () => {
                    setShowTools(keepOpen || !showTools);
                }, id: "usex-devtools-holder", style: Object.assign({ zIndex: 1000000001, width: "50px", height: "50px", background: "green", borderRadius: "50px", position: "fixed", boxShadow: "0px 0px 10px 1px #CCC", cursor: "pointer" }, XIconPosition) },
                React.createElement("div", { id: "react-store-explorer-holder", style: {
                        width: "50px",
                        height: "50px",
                        background: iconColor,
                        borderRadius: "50px",
                        position: "relative",
                        boxShadow: "0px 0px 10px 1px #CCC",
                        cursor: "pointer",
                    } },
                    React.createElement("span", { style: {
                            borderRadius: "5px",
                            border: "1px solid white",
                            background: "white",
                            width: "5px",
                            height: "5px",
                            left: "21.5px",
                            top: "10px",
                            position: "absolute",
                        } }),
                    React.createElement("span", { style: {
                            borderRadius: "5px",
                            border: "1px solid white",
                            background: "white",
                            width: "5px",
                            height: "5px",
                            left: "12px",
                            top: "30px",
                            position: "absolute",
                        } }),
                    React.createElement("span", { style: {
                            borderRadius: "5px",
                            border: "1px solid white",
                            background: "white",
                            width: "5px",
                            height: "5px",
                            left: "32px",
                            top: "30px",
                            position: "absolute",
                        } })))))));
};

function ReactStoreExplorer(props) {
    const { enableDevTools = true, keepOpen = false } = props;
    return (React.createElement(React.Fragment, null,
        React.createElement(ErrorBoundary, { Error: ErrorComponent },
            React.createElement("div", { style: { paddingRight: keepOpen ? "400px" : "0px" } },
                " ",
                props.children && props.children)),
        enableDevTools && (React.createElement(ErrorBoundary, { Error: ErrorComponent },
            React.createElement(DevTools, Object.assign({}, props))))));
}

const StoreExplorer = ReactStoreExplorer;

exports.StoreExplorer = StoreExplorer;
//# sourceMappingURL=index.js.map
