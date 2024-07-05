import React, { useState, useRef  } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfigurationList from "../forms/sheets/SheetDataDisplay";
import { GetSheets } from "../../utils/redux/actions/Sheets";
import { ATFXTOKEN } from "../../utils/constants/Constants";

const SheetsDataTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wsRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 4; 
  const reconnectDelay = 2000;
  const [selectedSheetId, setSelectedSheetId] = useState(0);
  const [selectedSheetName, setSelectedSheetName] = useState("");
  const [realTimeData, setRealTimeData] = useState({});
  const sheets = useSelector((state) => state.sheets);
  const authorizationToken = localStorage.getItem('ATFXTOKEN');

  const connectWebSocket = () => {
    try{

      wsRef.current = new WebSocket('ws://127.0.0.1:8765');
    
      wsRef.current.onopen = () => {
        console.log(`Connected...`);
        wsRef.current.send(JSON.stringify({ type: 'auth', authorizationToken }));
        reconnectAttempts.current = 0; 
      };
  
      wsRef.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message && message.type === 'updates') {
            const newData = message.data;
  
              setRealTimeData(prevState => {
                const updatedData = { ...prevState };
                const key = newData?.key;
                const value = newData?.data?.value;
                updatedData[key] = value;
    
                // for (let i = 0; i < newData.length; i++) {
                //   const key = newData[i].key;
                //   const value = newData[i].data.value;
                //   updatedData[key] = value;
                // }
    
                return updatedData;
              });
            
      
          }
        } catch (e) {
          console.error('Error processing message:', e);
        }
      };
  
      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      wsRef.current.onclose = (event) => {
        console.log('WebSocket closed:', event);
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current += 1;
          setTimeout(() => {
            console.log(`Reconnecting... (${reconnectAttempts.current}/${maxReconnectAttempts})`);
            connectWebSocket();
          }, reconnectDelay);
        } else {
          console.error('Max reconnection attempts reached. Connection closed permanently.');
        }
      };
    }catch(e){
console.log(e)
    }  
  };

  React.useEffect(() => {
    if (sheets && wsRef?.current?.readyState === WebSocket.OPEN) {
      console.log(sheets)
      wsRef.current.send(JSON.stringify({ type: 'subscribe', sheets }));
    }
  }, [sheets ,wsRef]);
  
  

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
    navigate("/editSheet", { state: { selectedSheetId }});
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
          setSelectedSheetId={setSelectedSheetId}
          selectedSheetName={selectedSheetName}
          setSelectedSheetName={setSelectedSheetName}
          realTimeData={realTimeData}
        />
      </div>
    </div>
  );
};

export default SheetsDataTable;
