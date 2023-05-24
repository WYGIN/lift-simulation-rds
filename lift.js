const queue = [];
//const stashQueue = [];

const addToqueue = (item) => {
 if(!(isLiftMovingToFloor(item) || queue.includes(item)))
    queue.push(item);
  if(isLiftFree() && queue.length != 0 && !isLiftMovingToFloor(queue[0])) {
    console.log('lift is free & calling moveLift from addToQueue');
    window.requestAnimationFrame(moveLift);
  }
}

const generateFloorsAndLifts = (floorCount, liftCount) => {  

    generateFloors(floorCount);  
    generateLifts(liftCount);  
  }  
    
  const generateFloors = (floorCount) => {
    let baseFloor;  
    let elevator = document.getElementById('elevator');  
    const container = document.getElementById('container'); 
    let rootwidth = window.innerWidth //document.getElementById('wrapper').offsetWidth;  
    for(let i = 0; i <= floorCount; i++) {  
      let e = document.createElement('div');  
      let ei = document.createElement('div');  
      ei.classList = 'w-full min-h-[240px] box-border flex gap-8';  
      ei.innerHTML = `  
      <div class="sticky right-0 text-slate-900 bg-transparent text-right border-t-2 w-full border-slate-800 flex flex-col items-end grow gap-2 px-2 items-center justify-center">  
          <div class="absolute left-0 top-0 w-full flex flex-auto flex-col grow border-t-4 border-blue-600 divider -mt-1 md:border-t-6 lg:border-t-8"></div>  
                    <div class="text-slate-800 font-medium text-lg z-15 sm:text-md md:text-mg xl:text-2xl">floor-${i}</div>  
                    ${   
                    i !== 0 ?  
                        `<button class='rounded-lg bg-green-500 px-3 py-2 flex flex-nowrap items-center justify-center z-15 md:px-4 md:py-2.5 lg:px-5 lg:py-3 min-w-1/2 max-w-1/2' id='up-${i}' onclick='addToqueue(${i});'>  
                                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='stroke-slate-100' class='w-6 h-6 fill-slate-100'>  
                              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />  
                            </svg>  
                            <span class="ml-2 text-slate-100 hidden text-md md:block lg:text-xl">up</span>  
                                          </button>` : ` 
                     <button class='rounded-lg bg-green-500 px-3 py-2 flex flex-nowrap items-center justify-center z-15 md:px-4 md:py-2.5 lg:px-5 lg:py-3 min-w-1/2 max-w-1/2' id='backButton' onclick="showUserInputScreen(); document.getElementById('container').innerHTML = ''; document.getElementById('elevator').innerHTML = ''; queue.length = 0; queue.length = 0;"> 
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="stroke-slate-100" class="w-6 h-6 fill-slate-100"> 
   <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" /> 
 </svg> 
 <span class="text-slate-100 ml-2 hidden text-md md:block lg:text-xl">back</span> 
                     </button> 
                                          `  
                    }  
                    <button class="rounded-lg bg-rose-500 px-3 py-2 z-15 flex flex-nowrap items-center justify-center z-15 md:px-4 md:py-2.5 lg:px-5 lg:py-3 min-w-1/2 max-w-1/2" id='down-${i}' onclick='addToqueue(${i})'>  
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="stroke-slate-100" class="w-6 h-6 fill-slate-100">  
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />  
      </svg>  
      <span class="text-slate-100 ml-2 hidden text-md md:block lg:text-xl">down</span>  
                    </button>  
                  </div>  
      `;  
      e.classList = 'w-full min-h-[240px] box-border flex gap-8';  
      ei.querySelector('.divider').style.minWidth = `${rootwidth}px `;  
      e.innerHTML = `  
            <div class="relative flex items-end justify-start w-full" title="floorContainer" id='floor-${i}'>  
            </div>  
      `;  
      if(i === 0) {  
        baseFloor = e;  
      } 
      elevator.appendChild(ei); 
      container.appendChild(e); 
    }
    return baseFloor;  
  }  
    
  const generateLifts = (liftCount) => {  
    const baseFloor = document.getElementById('floor-0');  
    for(let i = 0; i < liftCount; i++) {  
      let e = document.createElement('div'); 
      e.classList = 'bg-slate-500 overflow-hidden max-w-[90px] max-h-[160px] gap-1 transition-all duration-[2500ms] ease-linear lift z-15 box-border lift mx-1';
      e.dataset.position = 0;  
      e.dataset.moving = 'false';  
      e.dataset.to = 0;  
      e.setAttribute('id', `lift-${i}`)  
      e.innerHTML = `  
          <div class=" bg-slate-600 border-1 transition-all duration-[1500ms] ease-in-out leftDoor text-slate-100 door absolute left-0 top-0 bottom-0" id='leftDoor-lift-${i}'>${i}</div>  
          <div class="basis-1/2 bg-slate-600 border-1 ease-in-out transition-all duration-[1500ms] rightDoor door absolute right-0 top-0 bottom-0" id='rightDoor-lift-${i}'></div>  
      `; 
      baseFloor.appendChild(e);  
    }  
  }
    
  const moveLift = () => {
    let floorNo = null;
    const freeLift = isLiftFree();
    if(queue.length != 0 && freeLift) {
      /*queue.sort((a, b) => {
        if(freeLift.dataset.position >= queue[0]) return ( b - a);
        else return (a - b);
      })*/
      floorNo = queue.shift();
    }
    const nearLift = getNearLift(floorNo);
   // console.log(nearLift);
    if(parseInt(nearLift.dataset.position) === parseInt(floorNo)) {
      nearLift.dataset.moving = 'true';
      window.requestAnimationFrame(() => {
        openLiftDoors(nearLift);
      });
      return;
    }
    if(nearLift.dataset.moving === 'true') {
     // console.log('lift is moving currently .....')
      window.requestAnimationFrame(moveLift());
      return;
    }
    const liftAnim = [
      { transform: `translateY(${ -document.getElementById('floor-0').clientHeight * floorNo }px)` },
               ];
    const opt = {
      duration: Math.abs((nearLift.dataset.position * 2500) - (2500 * floorNo)),
      iterations: 1,
      fill: 'forwards',
    };
    window.requestAnimationFrame(() => {
      nearLift.dataset.moving = 'true';
      nearLift.dataset.to = floorNo;
      const nearAnim = nearLift.animate(liftAnim, opt);
      nearAnim.commitStyles();
      nearAnim.onfinish = () => {
        window.requestAnimationFrame(() => {
          openLiftDoors(nearLift);
          nearLift.dataset.position = floorNo;
        })
      }
    });
  }
    
  const openLiftDoors = (lift) => {
    console.log('called openDoors');
    const leftAnim = [
      { transform: 'translateX(-95%)' },
    ];
    const rightAnim = [
      { transform: 'translateX(95%)' }
    ];
    const resetAnim = [
      { transform: 'translateX(0%)'}
    ]
    const opt = {
      duration: 1250,
      iterations: 1,
      fill: 'forwards',
    };
  //  console.log(lift);
    const leftDoor = lift.querySelector('.leftDoor');
    const rightDoor = lift.querySelector('.rightDoor')
    
    const handle = window.requestAnimationFrame(() => {
      const leftAnimatable = leftDoor.animate(leftAnim, opt);
      const rightAnimatable = rightDoor.animate(rightAnim, opt);
      (leftAnimatable && rightAnimatable).commitStyles();
      (leftAnimatable && rightAnimatable).onfinish = () => {
        window.requestAnimationFrame(() => {
          const leftResetAnimatable = leftDoor.animate(resetAnim, opt);
          const rightResetAnimatable = rightDoor.animate(resetAnim, opt);
          rightResetAnimatable.onfinish = () => {
            lift.dataset.moving = 'false';
            if(isLiftFree() && queue.length != 0 && !isLiftMovingToFloor(queue[0]))
              window.requestAnimationFrame(moveLift);
          }
        });
      }
    });
  }
    
  const generateUserInputScreen = () => {  
    let e = document.getElementById('userInput');  
    e.innerHTML = `  
      <div class="flex items-center justify-center h-screen grow w-full">  
        <div class="bg-slate-200 rounded-lg px-5 py-2 flex flex-col gap-2 grow md:basis-2/3 lg:basis-3/4">  
          <legend class="text-2xl">Fill the form for Lift Simulation</legend>  
          <label>Enter the no of Floors:</label>  
          <input id='floorInput' class="px-3 py-1 rounded" type="number" required name="floors" min="1" value="1" />  
          <label>Enter the no of Lifts:</label>  
          <input id="liftInput" class="px-3 py-1 rounded" type="number" required name="lifts" min="1" value="1" />  
          <input type="submit" value="submit" class="px-3 py-2 rounded-lg bg-green-500 my-2 text-slate-900" onclick="showLiftSimulationScreen(); generateFloorsAndLifts(getFloorsCount(), getLiftsCount())" />  
        </div>  
      </div>  
    `; 
    const rootwidth = window.innerWidth; 
    document.getElementById('liftInput').max = `${ parseInt((rootwidth - (rootwidth * (20/100))) / 135 ) }` 
  }  
    
  const showUserInputScreen = () => {  
    document.getElementById('userInput').classList.remove('hidden');  
    document.getElementById('main').classList.add('hidden');  
  }  
    
  const showLiftSimulationScreen = () => {  
    document.getElementById('userInput').classList.add('hidden');  
    document.getElementById('main').classList.remove('hidden');
  }  
    
  const getFloorsCount = () => {  
    return document.getElementById('floorInput').value;  
  }  
  const getLiftsCount = () => {  
    return document.getElementById('liftInput').value;  
  }
    
  const getNearLift = (floorNo) => {
    const lifts = document.querySelectorAll('.lift');
    const restLifts = [...lifts].filter(lift => lift.dataset.moving === 'false');
    const absoluteDiffs = restLifts.map((lift) => Math.abs(floorNo - lift.dataset.position));
    const minAbsoluteDiff = Math.min(...absoluteDiffs);
    const nearestLift = restLifts.find(lift => Math.abs(floorNo - lift.dataset.position) === minAbsoluteDiff);
    // console.log('returning this lift as nearLift', `id: ${nearestLift.getAttribute('id')}, moving: ${nearestLift.dataset.moving}, minAbsoluteDiff: ${minAbsoluteDiff} from ${absoluteDiffs}`);
    return nearestLift;
  }
    
  const isLiftMovingToFloor = (floorNo) => {  
    const lifts = getLiftsCount();  
    for(let i = 0; i < lifts; i++) {  
      const lift = document.getElementById(`lift-${i}`);  
      if(lift.dataset.to == floorNo && lift.dataset.moving === 'true') {
        console.log(`${lift.getAttribute('id')} is moving to floor ${floorNo}`)  
        return true;  
      }  
    }  
    console.log(`there is no lift moving to floor ${floorNo}`)  
    return false;  
  }  
    
  const getLiftInFloor = (floorNo) => {  
    const lifts = getLiftsCount();  
    for (let i = 0; i < lifts; i++) {  
      const lift = document.getElementById(`lift-${i}`);  
      if (lift.dataset.position == floorNo) {  
        console.log(`${lift.getAttribute('id')} is in floor ${floorNo}`, 'getLiftsInFloor')  
        return lift;
      }  
    }  
    console.log(`there is no lift in floor ${floorNo}`)  
    return null;  
  }
  
  const isLiftFree = () => {
    const lifts = document.querySelectorAll('.lift');
    let freeLift;
    const liftFree = [...lifts].map((lift) => {
      if(lift.dataset.moving === 'false') freeLift = lift;
    })
   // console.log(freeLift);
    return freeLift;
  }
