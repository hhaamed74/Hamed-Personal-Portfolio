import { Fab, Zoom, useScrollTrigger } from "@mui/material";
import { KeyboardArrowUp as KeyboardArrowUpIcon } from "@mui/icons-material";

export default function ScrollToTop() {
  // بيراقب الـ scroll أول ما يعدي 300px الزرار بيظهر
  const trigger = useScrollTrigger({
    threshold: 300,
    disableHysteresis: true,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // طلعة ناعمة لفوق
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        onClick={handleClick}
        color="primary" // هياخد اللون الأساسي بتاع الثيم الحالي (أزرق، وردي، أو بنفسجي)
        size="small"
        aria-label="scroll back to top"
        sx={{
          position: "fixed",
          bottom: { xs: 80, md: 32 }, // لو موبايل بيطلع لفوق شوية عشان ميتداراش بالـ Bottom Nav لو موجود
          right: 32,
          boxShadow: 3,
          "&:hover": {
            transform: "scale(1.1)",
          },
          transition: "transform 0.2s, opacity 0.2s",
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}
