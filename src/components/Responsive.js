// styles.js

export const cardStyle = {
  maxHeight: "95vh",
  overflow: "auto",
  backgroundColor: (theme) => theme.palette.background.default,
  color: (theme) => theme.palette.text.primary,
  padding: { xs: 2, sm: 3 },
  width: "100%", //  Make card fill container
};


//  Container style for outer layout (like <Container /> component)
// Adds vertical padding and sets a max width based on screen size
export const containerStyle = {
  paddingY: { xs: 2, sm: 5 },
  maxWidth: "lg",
  width: "100%", // add this line to containerStyle
};


//  Style for each individual Todo card (the task box)
// Changes background color based on dark/light mode
export const todoCardStyle = {
  marginTop: 5, 
  backgroundColor: (theme) =>
    theme.palette.mode === "dark" ? "#2c387e" : "#448aff", // Custom background color per mode
  color: (theme) => theme.palette.text.primary,
};

//  Typography style for the main title (📝 My Todo-List)
// Responsive font sizing and margin for spacing
export const titleText = {
  fontSize: { xs: "1.5rem", sm: "2rem" }, 
  fontWeight: "bold",
  textAlign: "center",
  mb: 2, 
};

// styles.js

export const gridItemLeft = {
  xs: 12,
  sm: 8,
  sx: {
    display: "flex",
    alignItems: "center",
    flexGrow: { xs: 0, sm: 1 }, 
  },
};

export const gridItemRight = {
  xs: 12,
  sm: 4,
  sx: {
    display: "flex",
    alignItems: "center",
    justifyContent: { xs: "center", sm: "flex-start" },
    mt: { xs: 2, sm: 0 }, 
  },
};

export const addButtonStyle = {
  height: 56,
  width: {
    xs: "100%", 
    sm: "100%", 
    md: 160,
    lg: 200,
  },
};



