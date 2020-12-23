let xyz = [];
function scrape() {
  if (xyz.length >= 400) {
    console.log("done");
    return;
  }
  console.log("running, " + xyz.length);
  const arr1 = Array.from(document.getElementsByClassName("_2UpQX"));

  const x = arr1.map((a) => {
    const srcset = a.srcset.split(",")[arr1[0].srcset.split(",").length - 5];
    return srcset;
  });

  //   window.scroll(0, window.scrollY + 1000);

  //   for (let t = 1; t < 1000; t++) {
  //     window.scroll(0, window.scrollY + 1);
  //   }
  //   let j = 99;
  //   for (let i = 1; i < 1000000; i++) {
  //     j = j / i;
  //   }

  for (let z = 0; z < x.length; z++) {
    if (xyz.includes(x[z]) === false) {
      console.log("adding " + x[z]);
      xyz.push(x[z]);
    }
  }
  setTimeout(
    function () {
      scrape();
    }.bind(xyz),
    3000
  );
  //   scrape();
}
