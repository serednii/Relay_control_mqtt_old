const startAllFunctions = () => {
    return new Promise(resolve => {
        startIntervals();
        removeShowBlock();
        printPin();
        handleManualControl();
        handleShowTable();
        handleRelayTempOn();
        handleChangeSelect();
        handleChangeTempOnOff();
        handleSaveNameRelay();
        handleInputControlError();
        handleRelayTempChangeRadio();
        handleChangeRange();
        handleChangeDataSensor();
        handleClearDataSensor();
        handleSelectSensor();
        handleBtnSave();
        handleDefineDevice();
        handleRelaySection();
        handleSaveTime();
        handleClearTime();
        console.log('start function startAllFunctions()');
        resolve();
    });
}