import React, { useEffect, useState } from "react";
import { Grid, Button } from "@material-ui/core";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";

function Video() {
    const webcamRef = React.useRef(null);

    const [videoWidth, setVideoWidth] = useState(960);
    const [videoHeight, setVideoHeight] = useState(640);

    const [model, setModel] = useState();

    async function loadModel() {
        try {
            const model = await cocoSsd.load();
            setModel(model);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        tf.ready().then(() => {
            loadModel();
        });
    }, []);

    async function predictionFunction() {
        const predictions = await model.detect(document.getElementById("img"));
        var cnvs = document.getElementById("myCanvas");

        var ctx = cnvs.getContext("2d");
        ctx.clearRect(0, 0, webcamRef.current.video.videoWidth, webcamRef.current.video.videoHeight);

        if (predictions.length > 0) {
            console.log(predictions);
            for (let n = 0; n < predictions.length; n++) {
                // Check scores
                console.log(n);
                if (predictions[n].score > 0.8) {
                    let bboxLeft = predictions[n].bbox[0];
                    let bboxTop = predictions[n].bbox[1];
                    let bboxWidth = predictions[n].bbox[2];
                    let bboxHeight = predictions[n].bbox[3] - bboxTop;

                    ctx.beginPath();
                    ctx.font = "28px Arial";
                    ctx.fillStyle = "red";

                    ctx.fillText(
                        predictions[n].class + ": " + Math.round(parseFloat(predictions[n].score) * 100) + "%",
                        bboxLeft,
                        bboxTop
                    );

                    ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
                    ctx.strokeStyle = "#FF0000";

                    ctx.lineWidth = 3;
                    ctx.stroke();
                }
            }
        }

        setTimeout(() => predictionFunction(), 500);
    }

    const videoConstraints = {
        height: 1080,
        width: 1920,
        maxWidth: "100vw",
        facingMode: "environment",
    };

    return (
        <>
            <Grid
                container
                style={{
                    height: "100vh",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    padding: 20,
                }}
            >
                <Button
                    variant={"contained"}
                    style={{
                        position: "absolute",
                        top: "100px",
                        color: "white",
                        backgroundColor: "blueviolet",
                    }}
                    onClick={() => {
                        predictionFunction();
                    }}
                >
                    Start Detect
                </Button>

                <div style={{ position: "absolute", top: "200px", zIndex: "9999" }}>
                    <canvas
                        id="myCanvas"
                        width={videoWidth}
                        height={videoHeight}
                        style={{ backgroundColor: "transparent" }}
                    />
                </div>

                <div style={{ position: "absolute", top: "200px" }}>
                    <Webcam
                        audio={false}
                        id="img"
                        ref={webcamRef}
                        screenshotQuality={1}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                </div>

                <Grid item xs={12} md={12}></Grid>
            </Grid>
        </>
    );
}

export default Video;
