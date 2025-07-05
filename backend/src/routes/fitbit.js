import { Router } from "express";
const router = Router();
const FITBIT_API_BASE = "https://api.fitbit.com";
async function fetchFitbitAPI(token, endpoint) {
    const res = await fetch(`${FITBIT_API_BASE}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });
    if (!res.ok)
        throw new Error(`Fitbit API error: ${res.status}`);
    return res.json();
}
// Heart rate data
router.get("/heart-rate/:date", async (req, res) => {
    try {
        let token = req.token;
        const { date } = req.params;
        const data = await fetchFitbitAPI(token, `/1/user/-/activities/heart/date/${date}/1d/1min/time/00:00/23:59.json`);
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// ECG data
router.get("/ecg/:date", async (req, res) => {
    try {
        let token = req.token;
        const { date } = req.params;
        const data = await fetchFitbitAPI(token, `/1/user/-/ecg/list.json?afterDate=${date}&sort=asc&limit=1&offset=0`);
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Calories
router.get("/calories/:date", async (req, res) => {
    try {
        let token = req.token;
        const { date } = req.params;
        const data = await fetchFitbitAPI(token, `/1/user/-/activities/date/${date}.json`);
        res.json(data.summary.caloriesOut);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Sleep data
router.get("/sleep/:date", async (req, res) => {
    try {
        let token = req.token;
        const { date } = req.params;
        const data = await fetchFitbitAPI(token, `/1.2/user/-/sleep/date/${date}.json`);
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Steps
router.get("/steps/:date", async (req, res) => {
    try {
        let token = req.token;
        const { date } = req.params;
        const data = await fetchFitbitAPI(token, `/1/user/-/activities/date/${date}.json`);
        res.json(data.summary.steps);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Distance
router.get("/distance/:date", async (req, res) => {
    try {
        let token = req.token;
        const { date } = req.params;
        const data = await fetchFitbitAPI(token, `/1/user/-/activities/date/${date}.json`);
        const distance = data.summary.distances.find((d) => d.activity === "total").distance;
        res.json(distance);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Floors
router.get("/floors/:date", async (req, res) => {
    try {
        let token = req.token;
        const { date } = req.params;
        const data = await fetchFitbitAPI(token, `/1/user/-/activities/date/${date}.json`);
        res.json(data.summary.floors);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Active minutes
router.get("/active-minutes/:date", async (req, res) => {
    try {
        let token = req.token;
        const { date } = req.params;
        const data = await fetchFitbitAPI(token, `/1/user/-/activities/date/${date}.json`);
        const activeMinutes = data.summary.fairlyActiveMinutes + data.summary.veryActiveMinutes;
        res.json(activeMinutes);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Sedentary minutes
router.get("/sedentary-minutes/:date", async (req, res) => {
    try {
        let token = req.token;
        const { date } = req.params;
        const data = await fetchFitbitAPI(token, `/1/user/-/activities/date/${date}.json`);
        res.json(data.summary.sedentaryMinutes);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Recent activity
router.get("/recent-activity/:date", async (req, res) => {
    try {
        let token = req.token;
        const { date } = req.params;
        const data = await fetchFitbitAPI(token, `/1/user/-/activities/list.json?afterDate=${date}&sort=desc&limit=5&offset=0`);
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// HRV Daily
router.get("/hrv-daily/:date", async (req, res) => {
    try {
        let token = req.token;
        const { date } = req.params;
        const data = await fetchFitbitAPI(token, `/1/user/-/hrv/date/${date}.json`);
        res.json(data.hrv[0]);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// HRV Continuous
router.get("/hrv-continuous/:date", async (req, res) => {
    try {
        let token = req.token;
        const { date } = req.params;
        const data = await fetchFitbitAPI(token, `/1/user/-/hrv/date/${date}/2025-05-21.json`); // TODO fix date+1 issue
        res.json(data.hrv);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
export default router;
