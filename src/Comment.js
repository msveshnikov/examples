import * as tf from "@tensorflow/tfjs";
import { useState } from "react";
import { useEffect } from "react";
import { TextField, Button } from "@material-ui/core";

const url = {
    model: "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json",
    metadata: "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json",
};

const Comment = () => {
    const [metadata, setMetadata] = useState();
    const [model, setModel] = useState();
    const [text, setText] = useState("");
    const [score, setScore] = useState(0);

    async function loadModel(url) {
        try {
            const model = await tf.loadLayersModel(url.model);
            setModel(model);
        } catch (err) {
            console.log(err);
        }
    }

    async function loadMetadata(url) {
        try {
            const metadataJson = await fetch(url.metadata);
            const metadata = await metadataJson.json();
            setMetadata(metadata);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        tf.ready().then(() => {
            loadModel(url);
            loadMetadata(url);
        });
    }, []);

    function getSentimentScore(text) {
        const inputText = text
            .trim()
            .toLowerCase()
            .replace(/(\.|,|!)/g, "")
            .split(" ");

        //Convert the alphabetical token to numerical token using metadata
        const OOV_INDEX = 2;
        const sequence = inputText.map((word) => {
            let wordIndex = metadata?.word_index[word] + metadata?.index_from;
            if (wordIndex > metadata?.vocabulary_size) {
                wordIndex = OOV_INDEX;
            }
            return wordIndex;
        });

        const PAD_INDEX = 0;
        const padSequences = (sequences, maxLen, padding = "pre", truncating = "pre", value = PAD_INDEX) => {
            return sequences.map((seq) => {
                if (seq.length > maxLen) {
                    if (truncating === "pre") {
                        seq.splice(0, seq.length - maxLen);
                    } else {
                        seq.splice(maxLen, seq.length - maxLen);
                    }
                }
                if (seq.length < maxLen) {
                    const pad = [];
                    for (let i = 0; i < maxLen - seq.length; ++i) {
                        pad.push(value);
                    }
                    if (padding === "pre") {
                        seq = pad.concat(seq);
                    } else {
                        seq = seq.concat(pad);
                    }
                }
                return seq;
            });
        };
        const paddedSequence = padSequences([sequence], metadata.max_len);
        const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);

        const predictOut = model.predict(input);
        setScore(predictOut.dataSync()?.[0]);
        predictOut.dispose();
    }

    return (
        <>
            <TextField
                id="standard-read-only-input"
                label="Type your sentences here"
                onChange={(e) => setText(e.target.value)}
                value={text}
                multiline
                rows={4}
                variant="outlined"
            />
            <br />
            <Button style={{ width: "20vh", height: "5vh" }} variant="outlined" onClick={() => getSentimentScore(text)}>
                Calculate
            </Button>
            <br />
            <br />
            <TextField value={score} />
        </>
    );
};

export default Comment;
