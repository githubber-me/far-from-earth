"""Compose a narrated walkthrough from real browser captures and Sarvam clips."""
import json, subprocess, pathlib
from PIL import Image, ImageDraw, ImageFont
root=pathlib.Path(__file__).resolve().parent.parent
out=root/'public/demo'
captures=root/'docs/demo/captures'
lines=json.loads((root/'docs/demo/narration.json').read_text())
def run(args): subprocess.run(args,check=True,stdout=subprocess.DEVNULL,stderr=None)
def stamp(s):
 ms=round(s*1000);return f'{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02}.{ms%1000:03}'
cursor=0;vtt=['WEBVTT',''];concat=[]
for i,line in enumerate(lines):
 audio=out/f'voice-{i}.mp3'
 dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',str(audio)]))+1.0
 title=out/f'title-{i}.txt';title.write_text(line['title'])
 # The original screen remains legible inside a cinematic editorial frame.
 bar=Image.new('RGB',(1920,110),'#252c23');d=ImageDraw.Draw(bar)
 d.text((85,36),line['title'],font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',32),fill='#f5f3eb')
 d.text((1470,25),'SI-GENERATED MEDIA',font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',22),fill='#fffdf3')
 d.text((1470,62),'Artwork: OpenAI | Voice: Sarvam AI',font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',17),fill='#dce3d1')
 bar.save(out/f'bar-{i}.png')
 vf=f"[0:v]scale=1504:940:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:15:color=0xf5f3eb,fade=t=in:st=0:d=0.5,fade=t=out:st={dur-.5}:d=0.5[screen];[screen][2:v]overlay=0:970,scale=1920:1080,setsar=1[v]"
 clip=out/f'clip-{i}.mp4'
 run(['ffmpeg','-hide_banner','-loglevel','error','-y','-loop','1','-framerate','24','-i',str(captures/f'shot-{i}.jpg'),'-i',str(audio),'-loop','1','-i',str(out/f'bar-{i}.png'),'-filter_complex',vf,'-map','[v]','-map','1:a','-af','apad=pad_dur=1,loudnorm=I=-16:TP=-1.5:LRA=11','-t',str(dur),'-c:v','libx264','-preset','ultrafast','-crf','22','-pix_fmt','yuv420p','-c:a','aac','-b:a','160k','-metadata','artist=Anthahkarana','-metadata','comment=SI-generated artwork: OpenAI; SI-generated narration: Sarvam AI. Assembled screen-capture montage, not video-model output.','-metadata:s:a:0','handler_name=SI-generated narration | Sarvam AI',str(clip)])
 concat.append(f"file '{clip}'")
 # Sentence-length cues, evenly distributed within each narrated section.
 sentences=[s.strip()+'.' for s in line['text'].split('.') if s.strip()]
 step=(dur-1)/len(sentences)
 for j,sentence in enumerate(sentences):vtt.extend([f'{stamp(cursor+j*step)} --> {stamp(cursor+(j+1)*step)}',sentence,''])
 cursor+=dur
 print(f'Encoded scene {i+1}: {dur:.1f}s',flush=True)
(out/'concat.txt').write_text('\n'.join(concat))
run(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i',str(out/'concat.txt'),'-c','copy','-movflags','+faststart','-metadata:s:a:0','handler_name=SI-generated narration | Sarvam AI','-metadata','title=Mission Dhruva | SI-disclosed walkthrough','-metadata','artist=Anthahkarana','-metadata','comment=SI-generated artwork: OpenAI. SI-generated speech: Sarvam AI. SI-assisted code and game models: OpenAI Codex. Assembled screenshots, not video-model output.','-metadata','description=Contains SI-generated imagery and synthetic narration. Created by Anthahkarana. See /disclosure and si-disclosure.json.',str(out/'mission-dhruva.mp4')])
(out/'captions.vtt').write_text('\n'.join(vtt))
print(f'Demo complete: {cursor:.1f}s',flush=True)
