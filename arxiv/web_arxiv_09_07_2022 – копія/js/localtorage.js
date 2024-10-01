

























 

    //*********************************************************************** */
    //show menu local storage
    document.querySelector('.popap-menu__btn-local-storage').addEventListener('click', () => {
      POPAP_MENU.classList.toggle('popap-menu__show');
      document.querySelector('.popap-local-storage').classList.add('popap-local-storage__show');
      document.querySelector('.popap-local-storage__input-text').value = localStorage.getItem('nameDevice');
    });

    localStorageBtnClose.addEventListener('click', () => {
      document.querySelector('.popap-local-storage').classList.remove('popap-local-storage__show');
    });





    document.querySelector('.popap-local-storage__top-list').addEventListener('click', selectItem)

    document.querySelector('.popap-local-storage__btn-add').addEventListener('click', checkForm)
    document.querySelector('.popap-local-storage__btn-remove').addEventListener('click', removeItemList)
    document.querySelector('.popap-local-storage__btn-close').addEventListener('click', closeForm)

    function selectItem(event) {
      event.preventDefault();
      const dev = event.target.closest('.popap-local-storage__top-item').querySelector('.popap-local-storage__top-device').innerText;
      const nam = event.target.closest('.popap-local-storage__top-item').querySelector('.popap-local-storage__top-name').innerText;
      if (dev != 'Name Device' || nam != 'Name') {
        console.log(dev);
        console.log(nam);


        event.target.closest('.popap-local-storage__top-item').classList.toggle('click');
      }

    }


    {
      let arr = [];
      let obj = {}
      if (localStorage.getItem('Device') != null) {
        arr = JSON.parse(localStorage.getItem('Device'));
      }
      removeList();
      printListDevuci(arr);
    }


    
////////////////////////////////////////////////////
    function removeItemList(event) { //удаляємо видалені пристрої
      event.preventDefault();
      let arr = [];
      let obj = {
        // NameDevice: "",
        // Name: "",
      }
      const itemDevice = document.querySelectorAll('.popap-local-storage__top-item');
      if (localStorage.getItem('Device') != null || itemDevice.length > 0) {
        arr = JSON.parse(localStorage.getItem('Device'));

        let arrNumEl = [];
        document.querySelectorAll('.popap-local-storage__top-item').forEach((e, i) => {
          console.log(e)
          if (e.classList.contains('click')) {
            const deleteDevice = e.querySelector('.popap-local-storage__top-device').innerText;
            arrNumEl.push(arr.findIndex(name => name.NameDevice == deleteDevice));
          }
        });

        console.log(arr);
        arrNumEl.forEach(e => {
          delete arr[e];
        })
        console.log(arr);
        localStorage.setItem('Device', JSON.stringify(arr));
        removeList();
        printListDevuci(arr);
      } else return false;
    }
//////////////////////////////////////////////////////////



    function closeForm(event) {
      event.preventDefault();
    }

    function checkForm(event) {
      event.preventDefault();
      let arr = [];
      let obj = {
        // NameDevice: "",
        // Name: "",
      }

      const form = document.querySelector('.popap-local-storage__form');
      let nameDevice = form.device.value;
      let name = form.name.value;
      let fail
      if (localStorage.getItem('Device') != null) {
        arr = JSON.parse(localStorage.getItem('Device'));
      }


      if ((nameDevice == '' || name == '') && (nameDevice != 'Name Device' || name == 'Name'))
        fail = 'Заповніть всі поля';
      else if (arr != '') {
        arr.forEach(e => {
          if (e.NameDevice === nameDevice) {
            fail = 'Такий пристрій вже є';
          }
        })
      }

      if (fail != undefined) {
        alert(fail);
        return;
      }



      obj.NameDevice = nameDevice;
      obj.Name = name;


      arr.push(obj);

      localStorage.setItem('Device', JSON.stringify(arr));

      removeList();
      printListDevuci(arr);

    }

    function removeList() {
      const item = document.querySelectorAll('.popap-local-storage__top-item')
      item.forEach((e, i) => {
        if (i > 0) e.remove()
      })
    }

    function printListDevuci(arr) {
      //******************************************** */  
      arr.forEach((e) => {
        if(e!= null){
        const ul = document.querySelector('.popap-local-storage__top-list');
        let li = document.createElement('li');
        let a = document.createElement('a');
        let p = document.createElement('p');
        let p1 = document.createElement('p');


        li.className = 'popap-local-storage__top-item';
        a.href = "#";
        p.className = 'popap-local-storage__top-device';
        p.innerText = e.NameDevice;
        a.append(p);
        p1.className = 'popap-local-storage__top-name';
        p1.innerText = e.Name;
        a.append(p1);
        li.append(a);
        ul.append(li);
        }
      });

      //******************************************** */
    }





