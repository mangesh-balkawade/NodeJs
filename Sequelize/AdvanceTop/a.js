// // # function getData(no) {
// // #   let data = no;
// // #   function read() {
// // #     console.log(data);
// // #   }
// // #   return read;
// // # }

// // # let fptr = getData(12);
// // # fptr();

// let arr=[3,2,4,5,6,10,11,12]

// for (let i=0;i<arr.length;i++){
//     for(let j=0;j<arr.length-1-i;j++){
//         if(arr[j]>arr[j+1]){
//            let temp=arr[j]
//            arr[j]=arr[j+1]
//            arr[j+1]=temp
//         }
//     }
// }

// // console.log(arr);
// // let min=0
// // let max=0
// // let count=0
// // arr.forEach(element=>{
// // if(count==2){
// //     min=element
// // }
// // if(count==arr.length-3){
// //     max=element
// // }
// // count+=1
// // })

// // console.log("min :"+min+" max:"+max);

// let arr=[13,6,10,11,12,2,4,1]

// min=[Infinity,Infinity,Infinity]
// max=[0,0,0]

// for(let i=0;i<arr.length;i++)
// {
//     let flag=false
//     if(min[2]>arr[i]){
//         min[0]=min[1]
//         min[1]=min[2]
//         min[2]=arr[i]
//         flag=true
//     }
//     if((flag==false)&&min[1]>arr[i]){
//         min[0]=min[1]
//         min[1]=arr[i]
//         flag=true
//     }
//     if((flag==false)&&min[0]>arr[i]){
//         min[0]=arr[i]
//     }
//     console.log(min);
// }
// console.log(min[0]);

let str = "Mannggesh";

let map = new Map();

for (ch of str) {
  if (map.has(ch)) {
  map.set(ch, map.get(ch) + 1);
  } else {
    map.set(ch,1)
  }
}

console.log(map);
let flag=/[A-Z][A-Za-z]+/.test("Mangesh")
console.log(flag);