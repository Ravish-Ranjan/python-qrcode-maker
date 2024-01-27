import qrcode_maker
from sys import argv

argv = argv[1:]

obj = qrcode_maker.genqrcode(
    data=argv[0],
    fgcolor=argv[1],
    bgcolor=argv[2],    
)
print(obj.generateSvgStr())