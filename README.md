const arr = [
  { "id": 1, "post": "user1" },
  { "id": 2, "post": "user2" },
  { "id": 3, "post": "user3" }
];

const Find = (s, ins) => {
  let i = 0;
  while (i < ins.length && s != ins[i].id) {
    i++;
  }
  return i != ins.length;
};

let ins = [];
let i = 0;

while (i < arr.length) {
  let s = Math.floor(Math.random() * arr.length);  // Fixed random logic
  
  while (Find(s, ins)) {
    s = Math.floor(Math.random() * arr.length);
  }

  ins.push(arr[s]);
  i++;
}

console.log(ins);

