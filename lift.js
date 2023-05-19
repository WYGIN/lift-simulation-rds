const generateFloorsAndLifts = (floorCount, liftCount) => { 
  // console.log(floorCount) 
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
     ei.classList = 'w-full min-h-[240px] box-border flex gap-8 md:min-h-[300px] lg:min-h-[375px]'; 
     ei.innerHTML = ` 
     <div class="sticky right-0 text-slate-900 bg-transparent text-right border-t-2 w-full border-slate-800 flex flex-col items-end grow gap-2 px-2 items-center justify-center md:min-h-[300px] lg:min-h-[375px]"> 
         <div class="absolute right-0 top-0 w-full flex flex-auto flex-col grow border-t-4 border-blue-600 divider -mt-1 md:border-t-6 lg:border-t-8"></div> 
                   <div class="text-slate-800 font-medium text-lg z-15 sm:text-md md:text-mg xl:text-2xl">floor-${i}</div> 
                   ${  
                   i !== 0 ? 
                       `<button class='rounded-lg bg-green-500 px-3 py-2 flex flex-nowrap items-center justify-center z-15 md:px-4 md:py-2.5 lg:px-5 lg:py-3 min-w-1/2 max-w-1/2' id='up-${i}' onclick='moveLiftUp(${i});'> 
                                           <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='stroke-slate-100' class='w-6 h-6 fill-slate-100'> 
                             <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" /> 
                           </svg> 
                           <span class="ml-2 text-slate-100 hidden text-md md:block lg:text-xl">up</span> 
                                         </button>` : `
                    <button class='rounded-lg bg-green-500 px-3 py-2 flex flex-nowrap items-center justify-center z-15 md:px-4 md:py-2.5 lg:px-5 lg:py-3 min-w-1/2 max-w-1/2' id='backButton' onclick="showUserInputScreen(); document.getElementById('container').innerHTML = ''; document.getElementById('elevator').innerHTML = '';">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="stroke-slate-100" class="w-6 h-6 fill-slate-100">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
</svg>
<span class="text-slate-100 ml-2 hidden text-md md:block lg:text-xl">back</span>
                    </button>
                                         ` 
                   } 
                   <button class="rounded-lg bg-rose-500 px-3 py-2 z-15 flex flex-nowrap items-center justify-center z-15 md:px-4 md:py-2.5 lg:px-5 lg:py-3 min-w-1/2 max-w-1/2" id='down-${i}' onclick='moveLiftDown(${i})'> 
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="stroke-slate-100" class="w-6 h-6 fill-slate-100"> 
       <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" /> 
     </svg> 
     <span class="text-slate-100 ml-2 hidden text-md md:block lg:text-xl">down</span> 
                   </button> 
                 </div> 
     `; 
     e.classList = 'w-full min-h-[240px] box-border flex gap-8 md:min-h-[300px] lg:min-h-[375px]'; 
     ei.querySelector('.divider').style.minWidth = `${rootwidth}px `; 
     e.innerHTML = ` 
           <div class="relative flex w-full" title="floorContainer" id='floor-${i}'> 
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
     e.classList = 'flex bg-slate-500 overflow-x-hidden min-w-[135px] h-[240px] gap-1 transition-all duration-[2500ms] ease-linear mx-2 lift z-15 md:min-w-[168.75] md:min-h-[300px] lg:min-w-[210.9375px] lg:min-h-[375px]'; 
     e.dataset.position = 0; 
     e.dataset.moving = 'false'; 
     e.dataset.to = 0; 
     e.setAttribute('id', `lift-${i}`) 
     e.innerHTML = ` 
         <div class="basis-1/2 bg-slate-600 my-1 transition-all duration-[1500ms] ease-in-out leftDoor justify-items-end flex text-slate-100" id='leftDoor-lift-${i}'>${i}</div> 
         <div class="basis-1/2 bg-slate-600 my-1 ease-in-out transition-all duration-[1500ms] rightDoor" id='rightDoor-lift-${i}'></div> 
     `;
     baseFloor.appendChild(e); 
   } 
 } 
  
 const moveLiftUp = (floorCount) => { 
  // const lifts = getLiftsCount(); 
   const nearLift = getNearLiftUp(floorCount); 
   //console.log('nearest lift up: ', nearLift.getAttribute('id')); 
 //  console.log(`moving lift in rest: ${nearLift.dataset.position === 'false'}`) 
  // openLiftDoors(nearLift, floorCount, (nearLift, floorCount) => { 
     // console.log('lift callback', lift); 
     console.log('moveLiftUp is in rest at current floor?: ', isLiftInFloor(floorCount) && getLiftInFloor(floorCount) != null && getLiftInFloor(floorCount).dataset.moving === 'false') 
     if(isLiftInFloor(floorCount) && getLiftInFloor(floorCount) != null && getLiftInFloor(floorCount).dataset.moving === 'false') { 
       openLiftDoors(getLiftInFloor(floorCount), floorCount, (nearLift, floorCount) => { 
         nearLift.dataset.moving = 'true'; 
         setTimeout(() => { 
           nearLift.dataset.moving = 'false'; 
         }, 1500) 
         // nearLift.dataset.to = floorCount; 
       }); 
       return; 
     } 
     if (isLiftMovingToFloor(floorCount)) { 
       return; 
     } 
     if(!(/*isLiftInFloor(floorCount) ||*/ isLiftMovingToFloor(floorCount))) { 
       nearLift.dataset.moving = 'true'; 
       nearLift.dataset.to = floorCount; 
       nearLift.style.transition = `all ${(/*Math.round*/(2.5 * floorCount) - (nearLift.dataset.position * 2.5))}s linear`; 
       nearLift.style.transform = `translateY(${ -document.getElementById('floor-0').clientHeight * floorCount }px)`; 
       setTimeout(() => { 
         nearLift.addEventListener('transitionend', openLiftDoors(nearLift, floorCount, (nearLift, floorCount) => { 
           nearLift.dataset.position = floorCount; 
           nearLift.dataset.moving = 'false'; 
         })); 
       }, (/*Math.round*/(2500 * floorCount) - (nearLift.dataset.position * 2500))) 
     } 
  // }); 
 } 
  
 const moveLiftDown = (floorCount) => { 
  // const lifts = getLiftsCount(); 
    const nearLift = getNearLiftDown(floorCount); 
    //console.log('nearest lift up: ', nearLift.getAttribute('id')); 
    //  console.log(`moving lift in rest: ${nearLift.dataset.position === 'false'}`) 
    // openLiftDoors(nearLift, floorCount, (nearLift, floorCount) => { 
    // console.log('lift callback', lift); 
   // console.log('moveLiftDown is in rest at current floor?: ', isLiftInFloor(floorCount) && getLiftInFloor(floorCount) != null && getLiftInFloor(floorCount).dataset.moving === 'false') 
    if (isLiftInFloor(floorCount) && getLiftInFloor(floorCount) != null && getLiftInFloor(floorCount).dataset.moving === 'false') { 
      openLiftDoors(getLiftInFloor(floorCount), floorCount, (nearLift, floorCount) => { 
        nearLift.dataset.moving = 'true'; 
        setTimeout(() => { 
          nearLift.dataset.moving = 'false'; 
        }, 1500) 
        // nearLift.dataset.to = floorCount; 
      }); 
      return; 
    } 
    if (isLiftMovingToFloor(floorCount)) { 
      return; 
    } 
    if (!(/*isLiftInFloor(floorCount) ||*/ isLiftMovingToFloor(floorCount))) { 
      nearLift.dataset.moving = 'true'; 
      nearLift.dataset.to = floorCount; 
      nearLift.style.transition = `all ${(/*Math.round*/ (nearLift.dataset.position * 2.5) - (2.5 * floorCount))}s linear`; 
      nearLift.style.transform = `translateY(${ -document.getElementById('floor-0').clientHeight * floorCount }px)`; 
      setTimeout(() => { 
        nearLift.addEventListener('transitionend', openLiftDoors(nearLift, floorCount, (nearLift, floorCount) => { 
          nearLift.dataset.position = floorCount; 
          nearLift.dataset.moving = 'false'; 
        })); 
      }, ( /*Math.round*/(nearLift.dataset.position * 2500) -  (2500 * floorCount) )) 
    } 
    // }); 
 } 
  
 const openLiftDoors = (lift, floorCount, callback) => { 
  // console.log(lift) 
   const id = lift.getAttribute('id'); 
   const leftDoor = document.getElementById(`leftDoor-${id}`); 
   const rightDoor = document.getElementById(`rightDoor-${id}`); 
   leftDoor.style.transition = 'all 1.5s linear' 
   rightDoor.style.transition = 'all 1.5s linear' 
   leftDoor.style.transform = "translateX(-95%)"; 
   rightDoor.style.transform = "translateX(95%)"; 
   setTimeout(() => { 
     leftDoor.style.transform = "translateX(0%)"; 
     rightDoor.style.transform = "translateX(0%)"; 
     setTimeout(() => { 
       leftDoor.addEventListener('transitionend', callback(lift, floorCount)); 
     },1500); 
   }, 1500); 
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
   moveToBottom(); 
 } 
  
 const getFloorsCount = () => { 
   return document.getElementById('floorInput').value; 
 } 
 const getLiftsCount = () => { 
   return document.getElementById('liftInput').value; 
 } 
  
 const delay = ms => new Promise(res => setTimeout(res, ms)); 
  
 const wait = async () => { 
   await delay(2500) 
 } 
  
 const getNearLiftUp = (floorCount) => { 
   const lifts = getLiftsCount(); 
   let nearLift; 
   for(let i = 0; i < lifts; i++) { 
     const lift = document.getElementById(`lift-${i}`); 
     if(parseInt(lift.dataset.position) < parseInt(floorCount) && lift.dataset.moving === 'false') { 
       if(nearLift == null) { 
         //console.log(`nearLift is null & set to ${lift.getAttribute('id')}`) 
         nearLift = lift; 
       } 
       if(parseInt(nearLift.dataset.position) < parseInt(lift.dataset.position)) { 
         //console.log(`checking inside if condition: ${parseInt(nearLift.dataset.position) < lift.dataset.position}`) 
         //console.log(`nearLift current position: ${nearLift.dataset.position} of ${nearLift.getAttribute('id')} is overridden by ${lift.getAttribute('id')} at position ${lift.dataset.position}`) 
         nearLift = lift; 
       } 
     } 
     //console.log(`nearLift lift ${lift.getAttribute('id')} is either moving (${lift.dataset.moving}) or with position ${lift.dataset.position}`); 
   } 
  // nearLift.dataset.moving = 'true'; 
   return nearLift; 
 } 
  
 const getNearLiftDown = (floorCount) => { 
   const lifts = getLiftsCount(); 
   let nearLift; 
   for (let i = 0; i < lifts; i++) { 
     const lift = document.getElementById(`lift-${i}`); 
     if (parseInt(lift.dataset.position) > parseInt(floorCount) && lift.dataset.moving === 'false') { 
       if (nearLift == null) { 
         //console.log(`nearLift is null & set to ${lift.getAttribute('id')}`) 
         nearLift = lift; 
       } 
       if (parseInt(nearLift.dataset.position) > parseInt(lift.dataset.position)) { 
         //console.log(`checking inside if condition: ${parseInt(nearLift.dataset.position) < lift.dataset.position}`) 
         //console.log(`nearLift current position: ${nearLift.dataset.position} of ${nearLift.getAttribute('id')} is overridden by ${lift.getAttribute('id')} at position ${lift.dataset.position}`) 
         nearLift = lift; 
       } 
     } 
     //console.log(`nearLift lift ${lift.getAttribute('id')} is either moving (${lift.dataset.moving}) or with position ${lift.dataset.position}`); 
   } 
   // nearLift.dataset.moving = 'true'; 
   return nearLift; 
 } 
  
 const moveToBottom = () => { 
   document.getElementById('wrapper').scrollTop = document.getElementById('container').scrollHeight 
 } 
  
 const isLiftInFloor = (floorNo) => { 
   const lifts = getLiftsCount(); 
   for(let i = 0; i < lifts; i++) { 
     const lift = document.getElementById(`lift-${i}`); 
     console.log(`floor-${floorNo} ${lift.getAttribute('id')}`,`lift position: ${lift.dataset.position} ${lift.dataset.position == floorNo}`) 
     if(lift.dataset.position == floorNo) { 
       console.log(`${lift} is in floor ${floorNo}`) 
       return true; 
     } 
   } 
   console.log(`there is no lift in floor ${floorNo}`) 
   return false; 
 } 
  
 const isLiftMovingToFloor = (floorNo) => { 
   const lifts = getLiftsCount(); 
   for(let i = 0; i < lifts; i++) { 
     const lift = document.getElementById(`lift-${i}`); 
     if(lift.dataset.to == floorNo) { 
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
       console.log(`${lift.getAttribute('id')} is in floor floorNo`, 'getLiftsInFloor') 
       return lift; 
     } 
   } 
   console.log(`there is no lift in floor ${floorNo}`) 
   return null; 
 } 
  
 const getLiftMovingToFloor = (floorNo) => { 
   const lifts = getLiftsCount(); 
   for (let i = 0; i < lifts; i++) { 
     const lift = document.getElementById(`lift-${i}`); 
     if (lift.dataset.to == floorNo) { 
       console.log(`${lift.getAttribute('id')} is moving to floor ${floorNo}`) 
       return lift; 
     } 
   } 
   console.log(`there is no lift moving to ${floorNo}`) 
   return null; 
 }
