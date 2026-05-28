import { useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import GlobalStyles from "@mui/material/GlobalStyles";
import { useTheme, alpha } from "@mui/material/styles";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

/** Demo series — replace with API data when available */
const trendVisitors = [120, 198, 176, 242, 289, 310];
const trendSignups = [42, 52, 48, 61, 74, 81];
const regionTotals = [54, 38, 27, 31];
const regionLabels = ["North", "South", "East", "West"];
const channelShare = [
  { id: 0, value: 42, label: "Organic", color: "#1976d2" },
  { id: 1, value: 28, label: "Referral", color: "#2e7d32" },
  { id: 2, value: 18, label: "Social", color: "#ed6c02" },
  { id: 3, value: 12, label: "Direct", color: "#9c27b0" },
];

function KpiCard({ title, value, subtitle, sparkData, color }) {
  const theme = useTheme();
  const lineColor = color ?? theme.palette.primary.main;

  return (
    <Card
      variant="outlined"
      sx={{
        flex: 1,
        minWidth: { xs: "100%", sm: 200 },
        borderRadius: 2,
        bgcolor: "#fff",
        color: "text.primary",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
      }}
    >
      <CardContent sx={{ pb: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Typography variant="overline" color="text.secondary" display="block">
          {title}
        </Typography>
        <Stack direction="row" alignItems="flex-end" spacing={1}>
          <Typography variant="h4" component="p" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ pb: 0.5 }}>
            {subtitle}
          </Typography>
        </Stack>
        <Box sx={{ mt: 1, height: 40 }}>
          <SparkLineChart
            data={sparkData}
            area
            showTooltip
            color={lineColor}
            height={40}
            margin={{ top: 4, bottom: 4, left: 0, right: 0 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

function ChartCard({ title, description, children, sx, className }) {
  return (
    <Card
      className={className}
      variant="outlined"
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
        color: "text.primary",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
        ...sx,
      }}
    >
      <Box sx={{ px: 2.5, pt: 2, pb: 0 }}>
        <Typography variant="subtitle1" fontWeight={600} color="text.primary">
          {title}
        </Typography>
        {description ? (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        ) : null}
      </Box>
      <CardContent sx={{ flex: 1, pt: 1, "&:last-child": { pb: 2 } }}>
        {children}
      </CardContent>
    </Card>
  );
}

function ReportsPage() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary?.main ?? "#9c27b0";
  const preparedAt = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date()),
    []
  );

  const latestVisitors = trendVisitors[trendVisitors.length - 1];
  const latestSignups = trendSignups[trendSignups.length - 1];
  const conversionApprox =
    latestVisitors > 0
      ? ((latestSignups / latestVisitors) * 100).toFixed(1)
      : "0";

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <>
      <GlobalStyles
        styles={{
          "@media print": {
            "@page": {
              size: "A4 portrait",
              margin: "14mm",
            },
            "body *": {
              visibility: "hidden",
            },
            ".report-print-root, .report-print-root *": {
              visibility: "visible",
            },
            ".report-print-root": {
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              maxWidth: "100%",
              margin: 0,
              padding: 0,
              background: "#fff !important",
              color: "#111827 !important",
              minHeight: "auto !important",
              borderRadius: 0,
            },
            ".report-print-hide": {
              display: "none !important",
            },
            ".report-print-section": {
              breakInside: "avoid",
              pageBreakInside: "avoid",
            },
          },
        }}
      />
      <Box
        className="report-print-root"
        sx={{
          maxWidth: 1200,
          mx: "auto",
          p: 3,
          bgcolor: "#0b8685",
          minHeight: "calc(100vh - 96px)",
          borderRadius: 2,
          color: "#fff",
          "@media print": {
            p: 0,
            bgcolor: "#fff",
            color: "#111827",
            minHeight: "auto",
            borderRadius: 0,
            maxWidth: "100%",
          },
        }}
      >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
            <AssessmentOutlinedIcon color="primary" fontSize="small" />
            <Typography variant="h4" component="h1">
              Reports
            </Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary">
            Charts and data visualization for engagement and regional performance.
          </Typography>
          <Typography variant="caption" sx={{ display: "block", mt: 1 }} color="text.secondary">
            Prepared on {preparedAt}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip
            icon={<CalendarMonthOutlinedIcon />}
            label="Last 6 months"
            size="small"
            variant="outlined"
            color="primary"
          />
          <Chip
            label="Sample dataset"
            size="small"
            variant="filled"
            sx={{ bgcolor: "#f8fafc", color: "text.primary" }}
          />
          <Button
            className="report-print-hide"
            variant="contained"
            color="primary"
            size="small"
            startIcon={<PrintOutlinedIcon />}
            onClick={handlePrintReport}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              minWidth: "auto",
              px: 1.5,
              py: 0.75,
              alignSelf: "center",
              whiteSpace: "nowrap",
              boxShadow: theme.shadows[2],
            }}
          >
            Save PDF / Print
          </Button>
        </Stack>
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 3 }}
        className="report-print-section"
      >
        <KpiCard
          title="Visitors (Jun)"
          value={latestVisitors.toLocaleString()}
          subtitle="sessions"
          sparkData={trendVisitors}
          color={primary}
        />
        <KpiCard
          title="Sign-ups (Jun)"
          value={latestSignups.toLocaleString()}
          subtitle="new accounts"
          sparkData={trendSignups}
          color={secondary}
        />
        <KpiCard
          title="Conversion"
          value={`${conversionApprox}%`}
          subtitle="sign-ups ÷ visitors"
          sparkData={trendSignups.map((s, i) =>
            trendVisitors[i] ? (s / trendVisitors[i]) * 100 : 0
          )}
          color={theme.palette.success.main}
        />
      </Stack>

      <ChartCard
        title="Traffic & conversion trend"
        description="Monthly visitors compared with completed sign-ups."
        sx={{ mb: 3 }}
        className="report-print-section"
      >
        <LineChart
          height={320}
          grid={{ horizontal: true }}
          xAxis={[
            {
              scaleType: "point",
              data: MONTHS,
              label: "Month",
            },
          ]}
          series={[
            {
              data: trendVisitors,
              label: "Visitors",
              color: primary,
              showMark: true,
            },
            {
              data: trendSignups,
              label: "Sign-ups",
              color: secondary,
              showMark: true,
            },
          ]}
          margin={{ left: 52, right: 24, top: 24, bottom: 36 }}
        />
      </ChartCard>

      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={3}
        alignItems="stretch"
        className="report-print-section"
      >
        <ChartCard
          title="Regional totals"
          description="Aggregate volume by territory."
          sx={{ flex: 1, minWidth: 0 }}
        >
          <BarChart
            layout="horizontal"
            height={280}
            grid={{ vertical: true }}
            yAxis={[
              {
                scaleType: "band",
                data: regionLabels,
                label: "Region",
              },
            ]}
            series={[
              {
                data: regionTotals,
                label: "Total",
                layout: "horizontal",
                color: alpha(primary, 0.85),
              },
            ]}
            margin={{ left: 72, right: 24, top: 16, bottom: 32 }}
            xAxis={[{ label: "Volume" }]}
          />
        </ChartCard>

        <ChartCard
          title="Channel mix"
          description="Share of attributed sessions by source."
          sx={{ flex: 1, minWidth: 0, alignItems: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <PieChart
              series={[
                {
                  innerRadius: 48,
                  outerRadius: 112,
                  paddingAngle: 2,
                  cornerRadius: 4,
                  data: channelShare,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: { innerRadius: 44, additionalRadius: -6 },
                },
              ]}
              width={320}
              height={300}
              slotProps={
                {
                  legend: {
                    direction: "column",
                    position: { vertical: "middle", horizontal: "right" },
                    padding: 0,
                  },
                }
              }
            />
          </Box>
        </ChartCard>
      </Stack>

      <Divider sx={{ my: 4, borderColor: "rgba(15, 23, 42, 0.08)" }} />

      <Typography variant="caption" color="text.secondary" component="p">
        Figures shown are illustrative demo values for layout and chart styling.
        Wire these components to your analytics API when you connect real data.
      </Typography>
      </Box>
    </>
  );
}

export default ReportsPage;
