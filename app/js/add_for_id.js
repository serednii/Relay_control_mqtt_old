//Добавляємо для кожного input і label id


let arrayClass = [
  //   {
  //   labelData: '.rele__seting-switch__label',
  //   inputData: `.${CLASS_RELAY_SETTING_SWITCH_INPUT}`,
  //   nameData: 'seting-'
  // },
  {
    labelData: '.label-day',
    inputData: '.day',
    nameData: 'time-id-'
  },
  {
    labelData: '.input-control-error__label',
    inputData: '.input-control-error',
    nameData: 'err_on_'
  },
  {
    labelData: '.rele-temp-change__label',
    inputData: '.rele-temp-change-radio',
    nameData: 'on_'
  },
  {
    labelData: '.rele__seting-sensor__select-label',
    inputData: '.rele__seting-sensor__select',
    nameData: 'cars'
  },
  {
    labelData: '.rele-temp-vkl-start-label',
    inputData: CLASS_RELAY_TEMP_ON,
    nameData: 'temp_start_'
  },
  {
    labelData: '.rele-temp-vkl-end-label',
    inputData: CLASS_RELAY_TEMP_OFF,
    nameData: 'temp_end_'
  },
  {
    labelData: '.rele-temp-change-single__label',
    inputData: CLASS_RELAY_TEMP_CHANGE_SINGLE,
    nameData: 'one_range_'
  },
  {
    labelData: '.rele__timer-seting-show__label',
    inputData: '.rele__timer-seting-show__input',
    nameData: 'show-time_'
  }
  // {
  //   labelData: '.input-control-manually__label',
  //   inputData: '.input-control-manually__input',
  //   nameData: 'manual-'
  // }
];
//Призначаємо for and id for label and input
// setIdAndFor(relaySettingSwitchLabel, relaySettingSwitchInput,'seting-switch-');
// setIdAndFor(labelDey, inputDey,'time-id-' );

// setIdAndFor(relayTempChangeLabel, relayTempChangeRadio,'on_' );
// setIdAndFor(relaySettingSensorSelectLabel, relaySettingSensorSelect,'cars' );


const addIdAndFor = () => {
  return new Promise(resolve => {
    arrayClass.forEach(e => {
      let L = document.querySelectorAll(e.labelData);
      let I = document.querySelectorAll(e.inputData);
      if (L && I) setIdAndFor(L, I, e.nameData);
    });
    console.log('start function addIdAndFor()')
    resolve();
  })

}

function setIdAndFor(classLabel, classInput, nameId) {
  classInput.forEach((e, i) => {
    if (classLabel[i] && e) {
      e.setAttribute('id', (nameId + i));
      classLabel[i].setAttribute('for', ((nameId + i)));
    }
    // console.log(classLabel[i])
  });
}

