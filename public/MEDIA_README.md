# How to add your photos & demo video

All image paths are centralized in the **`IMG`** constant at the top of `app/page.tsx`. Drop files at the exact paths/filenames below and they'll render automatically.

## 1. Hero portrait (required)
```
public/images/hero/portrait.jpeg
```
Recommended: square or 3:4 aspect ratio, ~800×1000px, < 400 KB.

## 2. Student of the Year (featured card)
Goes into the "Best Outgoing Student" banner at the top of the Recognition section.
```
public/images/gallery/student-of-year.jpeg
```
Recommended: landscape 1600×1200 (4:3) or similar, < 500 KB. A shot of you with the award / at the ceremony works best.

## 3. Personal gallery (piano + students + moments)
These appear in the "Beyond the Code" immersive gallery:

```
public/images/gallery/piano-1.jpeg        <- you playing piano
public/images/gallery/piano-2.jpeg        <- another piano / performance shot
public/images/gallery/students-1.jpeg     <- you with students / teaching
public/images/gallery/students-2.jpeg     <- workshop / group photo
public/images/gallery/speaking-1.jpeg     <- technical talk / stage / MUN
public/images/gallery/hackathon-1.jpeg    <- hackathon / team / award moment
```
Recommended: 1200×1600 (portrait) or 1600×1200 (landscape), JPEG, < 500 KB each.

## 4. Snowflake badges & certifications
Already wired up — three badges at:

```
public/images/snowflake/badge-1.png
public/images/snowflake/badge-2.png
public/images/snowflake/badge-3.png
```
If you add more, number them sequentially (`badge-4.png`, `badge-5.png`, …) and append to the `IMG.snowflake` array in `app/page.tsx`.

## 5. Pramaan demo video

Two ways to add it. Pick **ONE**:

### Option A — Self-host (best quality, no external deps)
Drop the MP4 here:
```
public/videos/pramaan-demo.mp4
```
And (optional) a poster frame:
```
public/videos/pramaan-poster.jpg
```
Keep the file under ~25 MB; compress with HandBrake if needed.

### Option B — YouTube / Vimeo embed
Upload the video unlisted to YouTube, then open `app/page.tsx`, find the line:
```tsx
const PRAMAAN_VIDEO_URL = "/videos/pramaan-demo.mp4"
```
Replace it with your YouTube embed URL, e.g.:
```tsx
const PRAMAAN_VIDEO_URL = "https://www.youtube.com/embed/XXXXXXXXXXX"
```
The component auto-detects YouTube/Vimeo URLs vs local files.

## 6. Updating research paper URL
When your second paper goes live, open `app/page.tsx` and replace the placeholder `SCITEPRESS_PAPER_URL` constant with the real URL.
