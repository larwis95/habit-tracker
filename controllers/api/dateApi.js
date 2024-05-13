const datefns = require('date-fns');
const router = require('express').Router();

router.get('/', async (req, res) => {
  const date = new Date();
  res.json(datefns.format(date, 'MM/dd/yyyy'));
});

router.get('/time', async (req, res) => {
  const date = new Date();
  res.json(datefns.format(date, 'HH:mm:ss'));
});

router.get('/week', async (req, res) => {
  const date = new Date();
  const weekStart = datefns.startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = datefns.endOfWeek(date, { weekStartsOn: 1 });
  const week = datefns.eachDayOfInterval({ start: weekStart, end: weekEnd });
  res.json(week);

});

router.post('/compare', async (req, res) => {
  const { date1, date2 } = req.body;
  const result = datefns.isBefore(date1, date2);
  res.json(result);
});

module.exports = router;
