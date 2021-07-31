let video;
let poseNet;
let noseX = 0;
let noseY = 0;

function createPosition() {
  return { x: 0, y: 0 };
}

let leftShoulderP = createPosition();
let leftShoulder = createPosition();
let leftElbow = createPosition();
let leftElbowP = createPosition();
let leftWrist = createPosition();
let leftWristP = createPosition();
let leftHip = createPosition();
let leftHipP = createPosition();
let leftKnee = createPosition();
let leftKneeP = createPosition();
let leftAnkle = createPosition();
let leftAnkleP = createPosition();

let rightShoulderP = createPosition();
let rightShoulder = createPosition();
let rightElbow = createPosition();
let rightElbowP = createPosition();
let rightWrist = createPosition();
let rightWristP = createPosition();
let rightHip = createPosition();
let rightHipP = createPosition();
let rightKnee = createPosition();
let rightKneeP = createPosition();
let rightAnkle = createPosition();
let rightAnkleP = createPosition();

function assignPosition(position, keyPosition) {
  position.x = keyPosition.position.x;
  position.y = keyPosition.position.y;
}

function setup() {
  createCanvas(1280, 720);
  let constraints = {
    video: {
      mandatory: {
        minWidth: 1080,
        minHeight: 680,
      },
      optional: [{ maxFrameRate: 30 }],
    },
    audio: false,
  };
  // video = createCapture(constraints);
  video = createVideo("C0580.mov", () => video.play());
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", gotPoses);
}

let logged = 0;
function gotPoses(poses) {
  if (logged < 10) {
    console.log(poses);
    logged += 1;
  }

  if (poses.length > 0) {
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;

    assignPosition(leftShoulder, poses[0].pose.keypoints[5]);
    assignPosition(rightShoulder, poses[0].pose.keypoints[6]);
    assignPosition(leftElbow, poses[0].pose.keypoints[7]);
    assignPosition(leftWrist, poses[0].pose.keypoints[9]);
    assignPosition(leftHip, poses[0].pose.keypoints[11]);
    assignPosition(leftKnee, poses[0].pose.keypoints[13]);
    assignPosition(leftAnkle, poses[0].pose.keypoints[15]);

    assignPosition(rightElbow, poses[0].pose.keypoints[8]);
    assignPosition(rightWrist, poses[0].pose.keypoints[10]);
    assignPosition(rightHip, poses[0].pose.keypoints[12]);
    assignPosition(rightKnee, poses[0].pose.keypoints[14]);
    assignPosition(rightAnkle, poses[0].pose.keypoints[16]);

    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);

    leftShoulderP.x = lerp(leftShoulderP.x, leftShoulder.x, 0.5);
    leftShoulderP.y = lerp(leftShoulderP.y, leftShoulder.y, 0.5);

    rightShoulderP.x = lerp(rightShoulderP.x, rightShoulder.x, 0.5);
    rightShoulderP.y = lerp(rightShoulderP.y, rightShoulder.y, 0.5);

    rightElbowP.x = lerp(rightElbowP.x, rightElbow.x, 0.5);
    rightElbowP.y = lerp(rightElbowP.y, rightElbow.y, 0.5);

    rightWristP.x = lerp(rightWristP.x, rightWrist.x, 0.5);
    rightWristP.y = lerp(rightWristP.y, rightWrist.y, 0.5);

    leftElbowP.x = lerp(leftElbowP.x, leftElbow.x, 0.5);
    leftElbowP.y = lerp(leftElbowP.y, leftElbow.y, 0.5);

    leftWristP.x = lerp(leftWristP.x, leftWrist.x, 0.5);
    leftWristP.y = lerp(leftWristP.y, leftWrist.y, 0.5);

    leftHipP.x = lerp(leftHipP.x, leftHip.x, 0.5);
    leftHipP.y = lerp(leftHipP.y, leftHip.y, 0.5);

    leftKneeP.x = lerp(leftKneeP.x, leftKnee.x, 0.5);
    leftKneeP.y = lerp(leftKneeP.y, leftKnee.y, 0.5);

    rightHipP.x = lerp(leftHipP.x, leftHip.x, 0.5);
    rightHipP.y = lerp(leftHipP.y, leftHip.y, 0.5);

    rightKneeP.x = lerp(rightKneeP.x, rightKnee.x, 0.5);
    rightKneeP.y = lerp(rightKneeP.y, rightKnee.y, 0.5);

    leftAnkleP.x = lerp(leftAnkleP.x, leftAnkle.x, 0.5);
    leftAnkleP.y = lerp(leftAnkleP.y, leftAnkle.y, 0.5);

    rightAnkleP.x = lerp(rightAnkleP.x, rightAnkle.x, 0.5);
    rightAnkleP.y = lerp(rightAnkleP.y, rightAnkle.y, 0.5);
  }
}

function modelReady() {
  console.log("model ready");
}

function draw() {
  image(video, 0, 0);
  // background(255, 255, 255);
  fill(11, 25, 97);

  // ellipse(leftShoulderP.x, leftShoulderP.y, 80);
  // ellipse(rightShoulderP.x, rightShoulderP.y, 80);

  //  shoulder to elbow

  let v1 = createVector(leftShoulderP.x, leftShoulderP.y);
  let v2 = createVector(leftElbowP.x, leftElbowP.y);
  let v3 = createVector(leftWristP.x, leftWristP.y);
  let v4 = createVector(rightShoulderP.x, rightShoulderP.y);
  let v5 = createVector(rightElbowP.x, rightElbowP.y);
  let v6 = createVector(rightWristP.x, rightWristP.y);

  stroke(11, 25, 97);
  strokeWeight(100);

  const d1 = v1.dist(v4); // shoulder dist
  // console.log(d1)
  if (d1 >= 180) {
    // only one hand
    const multipler = 250 / d1;
    v1.mult(multipler);
    v2.mult(multipler);
    v3.mult(multipler);
    v4.mult(multipler);

    line(v1.x, v1.y, v2.x, v2.y);
    line(v2.x, v2.y, v3.x, v3.y);
    line(v4.x, v4.y, v5.x, v5.y);
    line(v5.x, v5.y, v6.x, v6.y);
  } else if (d1 < 180) {
    line(v1.x, v1.y, v2.x, v2.y);
    line(v2.x, v2.y, v3.x, v3.y);
  }

  //   line(leftHipP.x, leftHipP.y, leftKneeP.x, leftKneeP.y);
  //   line(rightHipP.x, rightHipP.y, rightKneeP.x, rightKneeP.y);
  //   line(leftKneeP.x, leftKneeP.y, leftAnkleP.x, leftAnkleP.y);
  //   line(rightKneeP.x, rightKneeP.y, rightAnkleP.x, rightAnkleP.y);

  noStroke();
  let center = createVector((v1.x + v4.x) / 2, (v1.y + v4.y) / 2);
  ellipse(center.x, center.y - 150, 200);
}
