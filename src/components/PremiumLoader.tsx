import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography, useTheme } from "@mui/material";

interface MatrixLoaderProps {
  children: React.ReactNode;
}

const MatrixLoader: React.FC<MatrixLoaderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const theme = useTheme();

  // مصفوفة الألوان المطلوبة (Sky, Rose, Grape, Emerald)
  const colors = ["#0ea5e9", "#f43f5e", "#8b5cf6", "#10b981"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
    const fontSize: number = 16;
    const columns: number = canvas.width / fontSize;
    const drops: number[] = new Array(Math.floor(columns)).fill(1);

    const draw = (): void => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // زيادة الشفافية قليلاً لتداخل الألوان
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        // اختيار لون عشوائي من المصفوفة لكل عمود
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.font = `${fontSize}px monospace`;

        const text = characters.charAt(
          Math.floor(Math.random() * characters.length),
        );
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [loading]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        const diff = Math.random() * 12;
        return Math.min(oldProgress + diff, 100);
      });
    }, 180);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              backgroundColor: "#030712", // Dark base
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                opacity: 0.6,
              }}
            />

            <Box
              sx={{
                zIndex: 2,
                textAlign: "center",
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                mx: 2,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  background: `linear-gradient(to right, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "900",
                  mb: 2,
                  letterSpacing: { xs: 4, md: 8 },
                  fontSize: { xs: "1.8rem", md: "2.8rem" },
                }}
              >
                HAMED_DEV
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  mb: 1.5,
                  fontFamily: "monospace",
                }}
              >
                SYSTEM_BOOT_SEQUENCE... {Math.round(progress)}%
              </Typography>

              {/* Progress Bar with Multi-color Gradient */}
              <Box
                sx={{
                  width: { xs: 240, md: 320 },
                  height: 10,
                  bgcolor: "rgba(255,255,255,0.05)",
                  borderRadius: 5,
                  position: "relative",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  style={{
                    height: "100%",
                    background: `linear-gradient(90deg, ${colors[0]}, ${colors[2]}, ${colors[3]})`,
                    boxShadow: `0 0 15px ${colors[0]}80`,
                  }}
                />
              </Box>

              <Stack
                direction="column"
                spacing={0.5}
                sx={{ mt: 3, textAlign: "left", opacity: 0.6 }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: colors[3], fontFamily: "monospace" }}
                >
                  {">"} STACK: MERN + LARAVEL... OK
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: colors[0], fontFamily: "monospace" }}
                >
                  {">"} UI_SYSTEM: MATERIAL_UI... READY
                </Typography>
              </Stack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};

import { Stack } from "@mui/material";

export default React.memo(MatrixLoader);
