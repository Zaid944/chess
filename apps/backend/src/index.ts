import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("plain string");
});
app.listen(PORT, () => {
    try {
        console.log(`chess http + ws server listening on port ${PORT}`);
    } catch (err) {
        console.log(`chess http + ws server both down at port ${PORT}`);
    }
});
