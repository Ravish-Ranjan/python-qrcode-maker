import pyqrcode
from io import BytesIO
from PIL import Image

class genqrcode:
    def __init__(self,data:str,fgcolor="#000000",bgcolor="#ffffff",scale:int=6,padding:int=4) -> None:
        self.data = data
        self.fgcolor = fgcolor
        self.bgcolor = bgcolor
        self.scale = scale
        self.padding = padding
        self.eng = pyqrcode.create(content=self.data)
    
    def generatePng(self,filepath) -> str:
        self.eng.png(
            file=filepath,
            scale=self.scale,
            module_color=self.fgcolor,
            background=self.bgcolor,
            quiet_zone=self.padding
        )

    def generateSvg(self,filepath) -> None:
        self.eng.svg(
            file=filepath,
            scale=self.scale,
            module_color=self.fgcolor,
            background=self.bgcolor,
            quiet_zone=self.padding
        )

    def generatePngStr(self) -> str:
        pngstr = self.eng.png_as_base64_str(
            scale=self.scale,
            module_color=self.fgcolor,
            background=self.bgcolor,
            quiet_zone=self.padding
        )
        return f'data:image/png;base64,{pngstr}'
    
    def generateSvgStr(self) -> str:
        buffer = BytesIO()
        self.eng.svg(
            file=buffer,
            scale=self.scale,
            module_color=self.fgcolor,
            background=self.bgcolor,
            quiet_zone=self.padding
        )
        return buffer.getvalue().decode().strip()
