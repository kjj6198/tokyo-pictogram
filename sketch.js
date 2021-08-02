let video;
let poseNet;
let noseX = 0;
let noseY = 0;

function createPosition() {
  return { x: 0, y: 0 }
}

let leftShoulderP = createPosition()
let leftShoulder = createPosition()
let leftElbow = createPosition()
let leftElbowP = createPosition()
let leftWrist = createPosition()
let leftWristP = createPosition()
let leftHip = createPosition()
let leftHipP = createPosition()
let leftKnee = createPosition()
let leftKneeP = createPosition()
let leftAnkle = createPosition()
let leftAnkleP = createPosition()


let rightShoulderP = createPosition()
let rightShoulder = createPosition()
let rightElbow = createPosition()
let rightElbowP = createPosition()
let rightWrist = createPosition()
let rightWristP = createPosition()
let rightHip = createPosition()
let rightHipP = createPosition()
let rightKnee = createPosition()
let rightKneeP = createPosition()
let rightAnkle = createPosition()
let rightAnkleP = createPosition()

function drawStick(v1, v2, radius1, radius2) {
  let list = [];
  for (let i = 0; i < 2; i++) {
    // get two vector for drawing rectangle
    const rad = atan2(v2.y - v1.y, v2.x - v1.x) + (Math.PI / 2) + (Math.PI * i)
    const p1 = createVector(
      radius1 * cos(rad) + v1.x,
      radius1 * sin(rad) + v1.y
    )

    const p2 = createVector(
      radius2 * cos(rad) + v2.x,
      radius2 * sin(rad) + v2.y
    )

    list.push(p1);
    list.push(p2);
  }

  beginShape();
  vertex(list[0].x, list[0].y);
  vertex(list[1].x, list[1].y);
  vertex(list[3].x, list[3].y);
  vertex(list[2].x, list[2].y);
  endShape();
}


function assignPosition(position, keyPosition) {
  position.x = keyPosition.position.x
  position.y = keyPosition.position.y
}

let legDisplay = false;
let cameraDiplay = true;

function setup() {
  createCanvas(1280, 720);
  createCheckbox('leg display', false).changed((e) => legDisplay = e.target.checked);
  createCheckbox('camera display', true).changed((e) => cameraDiplay = e.target.checked);
  let constraints = {
    video: {
      mandatory: {
        minWidth: 1080,
        minHeight: 680
      },
      optional: [{ maxFrameRate: 30 }]
    },
    audio: false
  };
  video = createCapture(constraints);
  video.hide();
  poseNet = ml5.poseNet(video, onModelReady);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  if (poses.length > 0) {
    // nose position as head center point
    let nX = poses[0].pose.keypoints[0].position.x;
    let nY = poses[0].pose.keypoints[0].position.y;

    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);

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

function onModelReady() {
  console.log('model is available now!');
}

function draw() {
  image(video, 0, 0);
  if (!cameraDiplay) {
    background(255, 255, 255);
  }
  fill(11, 25, 97);
  let v1 = createVector(leftShoulderP.x, leftShoulderP.y);
  let v2 = createVector(leftElbowP.x, leftElbowP.y);
  let v3 = createVector(leftWristP.x, leftWristP.y);
  let v4 = createVector(rightShoulderP.x, rightShoulderP.y);
  let v5 = createVector(rightElbowP.x, rightElbowP.y);
  let v6 = createVector(rightWristP.x, rightWristP.y);

  let v7 = createVector(leftHipP.x, leftHipP.y);
  let v8 = createVector(leftKneeP.x, leftKneeP.y);
  let v9 = createVector(leftAnkleP.x, leftAnkleP.y);

  let v10 = createVector(rightHipP.x, rightHipP.y);
  let v11 = createVector(rightKneeP.x, rightKneeP.y);
  let v12 = createVector(rightAnkleP.x, rightAnkleP.y);

  stroke(11, 25, 97);

  const d1 = v1.dist(v4); // left shoulder and right shoulder dist
  const d2 = v8.dist(v11); // knee dist

  const r1 = 140
  const r2 = 100
  const r3 = 85


  if (d1 >= 180) {
    ellipse(v1.x, v1.y, r1);
    ellipse(v2.x, v2.y, r2);
    ellipse(v3.x, v3.y, r3);
    ellipse(v4.x, v4.y, r1);
    ellipse(v5.x, v5.y, r2);
    ellipse(v6.x, v6.y, r3);

    drawStick(v1, v2, r1 / 2, r2 / 2);
    drawStick(v2, v3, r2 / 2, r3 / 2);
    drawStick(v4, v5, r1 / 2, r2 / 2);
    drawStick(v5, v6, r2 / 2, r3 / 2);

  } else if (d1 < 180) {
    // if two shoulder is too close, only display one shoulder
    // since z position is not recorded, display left shoulder always
    ellipse(v1.x, v1.y, r1);
    ellipse(v2.x, v2.y, r2);
    ellipse(v3.x, v3.y, r3);
    drawStick(v1, v2, r1 / 2, r2 / 2);
    drawStick(v2, v3, r2 / 2, r3 / 2);
  }

  if (legDisplay) {
    if (d2 < 100) {
      ellipse(v7.x, v7.y, r1);
      ellipse(v8.x, v8.y, r2);
      ellipse(v9.x, v9.y, r3);
      drawStick(v7, v8, r1 / 2, r2 / 2);
      drawStick(v8, v9, r2 / 2, r3 / 2);
    } else {
      ellipse(v7.x, v7.y, r1);
      ellipse(v8.x, v8.y, r2);
      ellipse(v9.x, v9.y, r3);
      ellipse(v10.x, v10.y, r1);
      ellipse(v11.x, v11.y, r2);
      ellipse(v12.x, v12.y, r3);

      drawStick(v7, v8, r1 / 2, r2 / 2);
      drawStick(v8, v9, r2 / 2, r3 / 2);
      drawStick(v10, v11, r1 / 2, r2 / 2);
      drawStick(v11, v12, r2 / 2, r3 / 2);

    }
  }

  noStroke();
  let center = createVector((v1.x + v4.x) / 2, (v1.y + v4.y) / 2);
  ellipse(noseX, noseY, 220);
}