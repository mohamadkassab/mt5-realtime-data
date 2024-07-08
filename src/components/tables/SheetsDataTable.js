import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfigurationList from "../forms/sheets/SheetDataDisplay";
import { GetSheets, SheetConnectionState } from "../../utils/redux/actions/Sheets";

const SheetsDataTable = () => {
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
      wsRef.current = new WebSocket("ws://127.0.0.1:8765");

      wsRef.current.onopen = () => {
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
            setRealTimeData((prevState) => {
              const updatedData = { ...prevState };
              const key = newData?.key;
              const value = newData?.data?.value;
              updatedData[key] = value;
              return updatedData;
            });
          }
          //  else if (message && message.type === "subscribe") {
          //   const stringSelectedSheetId = String(selectedSheetId);
          //   wsRef.current.send(
          //     JSON.stringify({ type: "subscribe", stringSelectedSheetId })
          //   );
          // } 
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
      console.log("isopen")
      dispatch(SheetConnectionState(true));
    }else{
      dispatch(SheetConnectionState(false));
      console.log("isclose")
    }
  
  }, [wsRef.current]); 

  React.useEffect(() => {
    setIsInitialLoad(false);
  }, []); 

  React.useEffect(() => {
    try{
      if (
        selectedSheetId !== 0
      ) { 
        const stringSelectedSheetId = String(selectedSheetId);
        wsRef.current.send(
          JSON.stringify({ type: "subscribe", stringSelectedSheetId })
        );
      }
    }catch(e){
      console.log(e)
    }

  }, [selectedSheetId, wsRef?.current?.readyState, isInitialLoad]);

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
    <div>
      <div>
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
      </div>
    </div>
  );
};

export default SheetsDataTable;
