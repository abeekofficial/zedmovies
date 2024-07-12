import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useSpring, animated } from "@react-spring/web";
import ReactPlayer from "react-player";
import { TrailorVideos } from "../../interface/media";

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Increased width
  height: "80%", // Added height
  bgcolor: "#000",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  trailer: TrailorVideos[];
}

export default function VideoModal({
  onClose,
  open,
  trailer,
}: VideoModalProps) {
  return (
    <div>
      {trailer.map((item) => (
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={open}
          onClose={onClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          key={item.id}
          slotProps={{
            backdrop: {
              TransitionComponent: Fade,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${item.key}`}
                width="100%"
                height="100%"
                controls
              />
            </Box>
          </Fade>
        </Modal>
      ))}
    </div>
  );
}
