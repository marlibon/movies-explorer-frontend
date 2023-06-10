const Flex = ({
    children,
    direction = "row",
    justifyContent = "flex-start",
    alignItems = "flex-start",
    gap = "0",
    flexWrap = 'nowrap',
    alignContent = 'stretch',
}) => {
    return (
        <div
            className="flex"
            style={{
                display: "flex",
                flexDirection: `${direction}`,
                justifyContent: `${justifyContent}`,
                alignItems: `${alignItems}`,
                gap: `${gap}`,
                flexWrap: `${flexWrap}`,
                alignContent: `${alignContent}`
            }}
        >
            {children}
        </div>
    );
};

export default Flex;
