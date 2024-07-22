import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfigurationList from "../forms/sheets/SheetDataDisplay";
import { GetSheets, SheetConnectionState } from "../../utils/redux/actions/Sheets";

const SheetsDataTable = (props) => {
  const WS_IP = process.env.REACT_APP_WS_IP;
  const WS_PORT = process.env.REACT_APP_WS_PORT;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wsRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 4;
  const reconnectDelay = 2000;
  const [selectedSheetName, setSelectedSheetName] = useState("");
  const [realTimeData, setRealTimeData] = useState({});
  const sheets = useSelector((state) => state.sheets);
  const authorizationToken = localStorage.getItem("ATFXTOKEN");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [selectedSheetId, setSelectedSheetId] = useState(sheets[0]?.sheet_id || 0);

  const connectWebSocket = () => {
    try {
      wsRef.current = new WebSocket(`ws://${WS_IP}:${WS_PORT}`);
      wsRef.current.onopen = () => {
        dispatch(SheetConnectionState(true));
        console.log(`Connected...`);
        wsRef.current.send(JSON.stringify({ type: "auth", authorizationToken }));
        const stringSelectedSheetId = String(selectedSheetId);
        wsRef.current.send(JSON.stringify({ type: "subscribe", stringSelectedSheetId }));
        reconnectAttempts.current = 0;
      };

      wsRef.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message && message.type === "updates") {
            const newData = message.data;
            const keyParts = newData.key.split(':');
            // setRealTimeData((prevState) => {
            //   const updatedData = { ...prevState };
            //   const key = newData?.key;
            //   const value = newData?.data?.value;
            //   updatedData[key] = value;
            //   return updatedData;
            // });
            setRealTimeData((prevState) => ({ 
                ...prevState,
              [prevState[newData?.key]] : newData?.data?.value       
            }));
            props.setNewNotification((
              `${keyParts[0]} : ${keyParts[5]} : ${keyParts[7]} : ${newData?.data?.value}`
            ));

            props.setNotifications((prevState) =>([
              ...prevState,
              `${keyParts[0]} : ${keyParts[5]} : ${keyParts[7]} : ${newData?.data?.value}`
             
            ]));

          }
          else if(message && message.type === "initial_data"){
            const newData = message.data.reduce((acc, item) => {
              acc[item.key] = item.data.value;
              return acc
            }, {})
            setRealTimeData((prevState) =>({
              ...prevState,
              ...newData
            }));
           
          }
        } catch (e) {
          console.error("Error processing message:", e);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      wsRef.current.onclose = (event) => {
        console.log("WebSocket closed:", event);
        dispatch(SheetConnectionState(false));   
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current += 1;
          setTimeout(() => {
            console.log(
              `Reconnecting... (${reconnectAttempts.current}/${maxReconnectAttempts})`
            );
            connectWebSocket();
          }, reconnectDelay);
        } else {
          console.error(
            "Max reconnection attempts reached. Connection closed permanently."
          );
        }
      };
    } catch (e) {
      console.log(e);
    }
  };

  const setSelectedSheetIdfunction = (id) =>{
    setSelectedSheetId(id);
  }
  
  React.useEffect(() => {
    if( wsRef?.current?.readyState === WebSocket.OPEN){
      dispatch(SheetConnectionState(true));
    }else{
      dispatch(SheetConnectionState(false));   
     }
  
  }, [wsRef.current]); 

  React.useEffect(() => {
    setIsInitialLoad(false);
  }, []); 

  React.useEffect(() => {
    try{
      if (
        selectedSheetId !== 0 && wsRef?.current?.readyState === WebSocket.OPEN
      ) { 
        const stringSelectedSheetId = String(selectedSheetId);
        wsRef.current.send(
          JSON.stringify({ type: "subscribe", stringSelectedSheetId })
        );
      }
    }catch(e){
      console.log(e)
    }

  }, [selectedSheetId, wsRef?.current?.readyState, isInitialLoad, sheets]);

  React.useEffect(() => {
    connectWebSocket();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  React.useEffect(() => {
    dispatch(GetSheets());
  }, [dispatch]);

  const onEditing = () => {
    navigate("/editSheet", { state: { selectedSheetId } });
  };

  const onInserting = () => {
    navigate("/createSheet");
  };

  return (
    <>
        <ConfigurationList
          sheets={sheets}
          onInserting={onInserting}
          onEditing={onEditing}
          selectedSheetId={selectedSheetId}
          setSelectedSheetIdfunction={setSelectedSheetIdfunction}
          selectedSheetName={selectedSheetName}
          setSelectedSheetName={setSelectedSheetName}
          realTimeData={realTimeData}
        />
    </>
  );
};

export default SheetsDataTable;
