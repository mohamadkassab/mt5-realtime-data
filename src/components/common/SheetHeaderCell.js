import {
    TableCell,
  } from "@mui/material";
const SheetHeaderCell = ({caption}) =>{
    return(<>
       <TableCell
                sx={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "white",
                  zIndex: 1,
                  fontWeight: "bold",
                }}
              >
                {caption}
              </TableCell>
    </>)
}
export default SheetHeaderCell