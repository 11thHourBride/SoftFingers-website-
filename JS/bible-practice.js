// ==== BIBLE PRACTICE SYSTEM ====

// Expanded Bible verses from KJV
const BIBLE_DATA = {
  oldTestament: [
    {
      name: "Genesis",
      totalChapters: 50,
      verses: {
        1: [
          "In the beginning God created the heaven and the earth.",
          "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
          "And God said, Let there be light: and there was light.",
          "And God saw the light, that it was good: and God divided the light from the darkness.",
          "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.",
          "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.",
          "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.",
          "And God called the firmament Heaven. And the evening and the morning were the second day.",
        "And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so.",
        "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.",
        "And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, whose seed is in itself, upon the earth: and it was so.",
        "And the earth brought forth grass, and herb yielding seed after his kind, and the tree yielding fruit, whose seed was in itself, after his kind: and God saw that it was good.",
        "And the evening and the morning were the third day.",
        "And God said, Let there be lights in the firmament of the heaven to divide the day from the night; and let them be for signs, and for seasons, and for days, and years:",
        "And let them be for lights in the firmament of the heaven to give light upon the earth: and it was so.",
        "And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also.",
        "And God set them in the firmament of the heaven to give light upon the earth,",
        "And to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good.",
        "And the evening and the morning were the fourth day.",
        "And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven.",
        "And God created great whales, and every living creature that moveth, which the waters brought forth abundantly, after their kind, and every winged fowl after his kind: and God saw that it was good.",
        "And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas, and let fowl multiply in the earth.",
        "And the evening and the morning were the fifth day.",
        "And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth after his kind: and it was so.",
        "And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good.",
        "And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth.",
        "So God created man in his own image, in the image of God created he him; male and female created he them.",
        "And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth.",
        "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat.",
        "And to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth, wherein there is life, I have given every green herb for meat: and it was so.",
        "And God saw every thing that he had made, and, behold, it was very good. And the evening and the morning were the sixth day."
],
        2: [
  "Thus the heavens and the earth were finished, and all the host of them.",
  "And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made.",
  "And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made.",
  "These are the generations of the heavens and of the earth when they were created, in the day that the Lord God made the earth and the heavens,",
  "And every plant of the field before it was in the earth, and every herb of the field before it grew: for the Lord God had not caused it to rain upon the earth, and there was not a man to till the ground.",
  "But there went up a mist from the earth, and watered the whole face of the ground.",
  "And the Lord God formed man of the dust of the ground, and breathed into his nostrils the breath of life; and man became a living soul.",
  "And the Lord God planted a garden eastward in Eden; and there he put the man whom he had formed.",
  "And out of the ground made the Lord God to grow every tree that is pleasant to the sight, and good for food; the tree of life also in the midst of the garden, and the tree of knowledge of good and evil.",
  "And a river went out of Eden to water the garden; and from thence it was parted, and became into four heads.",
  "The name of the first is Pison: that is it which compasseth the whole land of Havilah, where there is gold;",
  "And the gold of that land is good: there is bdellium and the onyx stone.",
  "And the name of the second river is Gihon: the same is it that compasseth the whole land of Ethiopia.",
  "And the name of the third river is Hiddekel: that is it which goeth toward the east of Assyria. And the fourth river is Euphrates.",
  "And the Lord God took the man, and put him into the garden of Eden to dress it and to keep it.",
  "And the Lord God commanded the man, saying, Of every tree of the garden thou mayest freely eat:",
  "But of the tree of the knowledge of good and evil, thou shalt not eat of it: for in the day that thou eatest thereof thou shalt surely die.",
  "And the Lord God said, It is not good that the man should be alone; I will make him an help meet for him.",
  "And out of the ground the Lord God formed every beast of the field, and every fowl of the air; and brought them unto Adam to see what he would call them: and whatsoever Adam called every living creature, that was the name thereof.",
  "And Adam gave names to all cattle, and to the fowl of the air, and to every beast of the field; but for Adam there was not found an help meet for him.",
  "And the Lord God caused a deep sleep to fall upon Adam, and he slept: and he took one of his ribs, and closed up the flesh instead thereof;",
  "And the rib, which the Lord God had taken from man, made he a woman, and brought her unto the man.",
  "And Adam said, This is now bone of my bones, and flesh of my flesh: she shall be called Woman, because she was taken out of Man.",
  "Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh.",
  "And they were both naked, the man and his wife, and were not ashamed."
]
,
        3:[
  "Now the serpent was more subtil than any beast of the field which the Lord God had made. And he said unto the woman, Yea, hath God said, Ye shall not eat of every tree of the garden?",
  "And the woman said unto the serpent, We may eat of the fruit of the trees of the garden:",
  "But of the fruit of the tree which is in the midst of the garden, God hath said, Ye shall not eat of it, neither shall ye touch it, lest ye die.",
  "And the serpent said unto the woman, Ye shall not surely die:",
  "For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil.",
  "And when the woman saw that the tree was good for food, and that it was pleasant to the eyes, and a tree to be desired to make one wise, she took of the fruit thereof, and did eat, and gave also unto her husband with her; and he did eat.",
  "And the eyes of them both were opened, and they knew that they were naked; and they sewed fig leaves together, and made themselves aprons.",
  "And they heard the voice of the Lord God walking in the garden in the cool of the day: and Adam and his wife hid themselves from the presence of the Lord God amongst the trees of the garden.",
  "And the Lord God called unto Adam, and said unto him, Where art thou?",
  "And he said, I heard thy voice in the garden, and I was afraid, because I was naked; and I hid myself.",
  "And he said, Who told thee that thou wast naked? Hast thou eaten of the tree, whereof I commanded thee that thou shouldest not eat?",
  "And the man said, The woman whom thou gavest to be with me, she gave me of the tree, and I did eat.",
  "And the Lord God said unto the woman, What is this that thou hast done? And the woman said, The serpent beguiled me, and I did eat.",
  "And the Lord God said unto the serpent, Because thou hast done this, thou art cursed above all cattle, and above every beast of the field; upon thy belly shalt thou go, and dust shalt thou eat all the days of thy life:",
  "And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel.",
  "Unto the woman he said, I will greatly multiply thy sorrow and thy conception; in sorrow thou shalt bring forth children; and thy desire shall be to thy husband, and he shall rule over thee.",
  "And unto Adam he said, Because thou hast hearkened unto the voice of thy wife, and hast eaten of the tree, of which I commanded thee, saying, Thou shalt not eat of it: cursed is the ground for thy sake; in sorrow shalt thou eat of it all the days of thy life;",
  "Thorns also and thistles shall it bring forth to thee; and thou shalt eat the herb of the field;",
  "In the sweat of thy face shalt thou eat bread, till thou return unto the ground; for out of it wast thou taken: for dust thou art, and unto dust shalt thou return.",
  "And Adam called his wife's name Eve; because she was the mother of all living.",
  "Unto Adam also and to his wife did the Lord God make coats of skins, and clothed them.",
  "And the Lord God said, Behold, the man is become as one of us, to know good and evil: and now, lest he put forth his hand, and take also of the tree of life, and eat, and live for ever:",
  "Therefore the Lord God sent him forth from the garden of Eden, to till the ground from whence he was taken.",
  "So he drove out the man; and he placed at the east of the garden of Eden Cherubims, and a flaming sword which turned every way, to keep the way of the tree of life."
],
    4:[
  "And Adam knew Eve his wife; and she conceived, and bare Cain, and said, I have gotten a man from the Lord.",
  "And she again bare his brother Abel. And Abel was a keeper of sheep, but Cain was a tiller of the ground.",
  "And in process of time it came to pass, that Cain brought of the fruit of the ground an offering unto the Lord.",
  "And Abel, he also brought of the firstlings of his flock and of the fat thereof. And the Lord had respect unto Abel and to his offering:",
  "But unto Cain and to his offering he had not respect. And Cain was very wroth, and his countenance fell.",
  "And the Lord said unto Cain, Why art thou wroth? and why is thy countenance fallen?",
  "If thou doest well, shalt thou not be accepted? and if thou doest not well, sin lieth at the door. And unto thee shall be his desire, and thou shalt rule over him.",
  "And Cain talked with Abel his brother: and it came to pass, when they were in the field, that Cain rose up against Abel his brother, and slew him.",
  "And the Lord said unto Cain, Where is Abel thy brother? And he said, I know not: Am I my brother's keeper?",
  "And he said, What hast thou done? the voice of thy brother's blood crieth unto me from the ground.",
  "And now art thou cursed from the earth, which hath opened her mouth to receive thy brother's blood from thy hand;",
  "When thou tillest the ground, it shall not henceforth yield unto thee her strength; a fugitive and a vagabond shalt thou be in the earth.",
  "And Cain said unto the Lord, My punishment is greater than I can bear.",
  "Behold, thou hast driven me out this day from the face of the earth; and from thy face shall I be hid; and I shall be a fugitive and a vagabond in the earth; and it shall come to pass, that every one that findeth me shall slay me.",
  "And the Lord said unto him, Therefore whosoever slayeth Cain, vengeance shall be taken on him sevenfold. And the Lord set a mark upon Cain, lest any finding him should kill him.",
  "And Cain went out from the presence of the Lord, and dwelt in the land of Nod, on the east of Eden.",
  "And Cain knew his wife; and she conceived, and bare Enoch: and he builded a city, and called the name of the city, after the name of his son, Enoch.",
  "And unto Enoch was born Irad: and Irad begat Mehujael: and Mehujael begat Methusael: and Methusael begat Lamech.",
  "And Lamech took unto him two wives: the name of the one was Adah, and the name of the other Zillah.",
  "And Adah bare Jabal: he was the father of such as dwell in tents, and of such as have cattle.",
  "And his brother's name was Jubal: he was the father of all such as handle the harp and organ.",
  "And Zillah, she also bare Tubalcain, an instructer of every artificer in brass and iron: and the sister of Tubalcain was Naamah.",
  "And Lamech said unto his wives, Adah and Zillah, Hear my voice; ye wives of Lamech, hearken unto my speech: for I have slain a man to my wounding, and a young man to my hurt.",
  "If Cain shall be avenged sevenfold, truly Lamech seventy and sevenfold.",
  "And Adam knew his wife again; and she bare a son, and called his name Seth: For God, said she, hath appointed me another seed instead of Abel, whom Cain slew.",
  "And to Seth, to him also there was born a son; and he called his name Enos: then began men to call upon the name of the Lord."
],
     5:[
  "This is the book of the generations of Adam. In the day that God created man, in the likeness of God made he him;",
  "Male and female created he them; and blessed them, and called their name Adam, in the day when they were created.",
  "And Adam lived an hundred and thirty years, and begat a son in his own likeness, after his image; and called his name Seth:",
  "And the days of Adam after he had begotten Seth were eight hundred years: and he begat sons and daughters:",
  "And all the days that Adam lived were nine hundred and thirty years: and he died.",
  "And Seth lived an hundred and five years, and begat Enos:",
  "And Seth lived after he begat Enos eight hundred and seven years, and begat sons and daughters:",
  "And all the days of Seth were nine hundred and twelve years: and he died.",
  "And Enos lived ninety years, and begat Cainan:",
  "And Enos lived after he begat Cainan eight hundred and fifteen years, and begat sons and daughters:",
  "And all the days of Enos were nine hundred and five years: and he died.",
  "And Cainan lived seventy years, and begat Mahalaleel:",
  "And Cainan lived after he begat Mahalaleel eight hundred and forty years, and begat sons and daughters:",
  "And all the days of Cainan were nine hundred and ten years: and he died.",
  "And Mahalaleel lived sixty and five years, and begat Jared:",
  "And Mahalaleel lived after he begat Jared eight hundred and thirty years, and begat sons and daughters:",
  "And all the days of Mahalaleel were eight hundred ninety and five years: and he died.",
  "And Jared lived an hundred sixty and two years, and he begat Enoch:",
  "And Jared lived after he begat Enoch eight hundred years, and begat sons and daughters:",
  "And all the days of Jared were nine hundred sixty and two years: and he died.",
  "And Enoch lived sixty and five years, and begat Methuselah:",
  "And Enoch walked with God after he begat Methuselah three hundred years, and begat sons and daughters:",
  "And all the days of Enoch were three hundred sixty and five years:",
  "And Enoch walked with God: and he was not; for God took him.",
  "And Methuselah lived an hundred eighty and seven years, and begat Lamech:",
  "And Methuselah lived after he begat Lamech seven hundred eighty and two years, and begat sons and daughters:",
  "And all the days of Methuselah were nine hundred sixty and nine years: and he died.",
  "And Lamech lived an hundred eighty and two years, and begat a son:",
  "And he called his name Noah, saying, This same shall comfort us concerning our work and toil of our hands, because of the ground which the Lord hath cursed.",
  "And Lamech lived after he begat Noah five hundred ninety and five years, and begat sons and daughters:",
  "And all the days of Lamech were seven hundred seventy and seven years: and he died.",
  "And Noah was five hundred years old: and Noah begat Shem, Ham, and Japheth."
],
     6:[
  "And it came to pass, when men began to multiply on the face of the earth, and daughters were born unto them,",
  "That the sons of God saw the daughters of men that they were fair; and they took them wives of all which they chose.",
  "And the Lord said, My spirit shall not always strive with man, for that he also is flesh: yet his days shall be an hundred and twenty years.",
  "There were giants in the earth in those days; and also after that, when the sons of God came in unto the daughters of men, and they bare children to them, the same became mighty men which were of old, men of renown.",
  "And God saw that the wickedness of man was great in the earth, and that every imagination of the thoughts of his heart was only evil continually.",
  "And it repented the Lord that he had made man on the earth, and it grieved him at his heart.",
  "And the Lord said, I will destroy man whom I have created from the face of the earth; both man, and beast, and the creeping thing, and the fowls of the air; for it repenteth me that I have made them.",
  "But Noah found grace in the eyes of the Lord.",
  "These are the generations of Noah: Noah was a just man and perfect in his generations, and Noah walked with God.",
  "And Noah begat three sons, Shem, Ham, and Japheth.",
  "The earth also was corrupt before God, and the earth was filled with violence.",
  "And God looked upon the earth, and, behold, it was corrupt; for all flesh had corrupted his way upon the earth.",
  "And God said unto Noah, The end of all flesh is come before me; for the earth is filled with violence through them; and, behold, I will destroy them with the earth.",
  "Make thee an ark of gopher wood; rooms shalt thou make in the ark, and shalt pitch it within and without with pitch.",
  "And this is the fashion which thou shalt make it of: The length of the ark shall be three hundred cubits, the breadth of it fifty cubits, and the height of it thirty cubits.",
  "A window shalt thou make to the ark, and in a cubit shalt thou finish it above; and the door of the ark shalt thou set in the side thereof; with lower, second, and third stories shalt thou make it.",
  "And, behold, I, even I, do bring a flood of waters upon the earth, to destroy all flesh, wherein is the breath of life, from under heaven; and every thing that is in the earth shall die.",
  "But with thee will I establish my covenant; and thou shalt come into the ark, thou, and thy sons, and thy wife, and thy sons' wives with thee.",
  "And of every living thing of all flesh, two of every sort shalt thou bring into the ark, to keep them alive with thee; they shall be male and female.",
  "Of fowls after their kind, and of cattle after their kind, of every creeping thing of the earth after his kind, two of every sort shall come unto thee, to keep them alive.",
  "And take thou unto thee of all food that is eaten, and thou shalt gather it to thee; and it shall be for food for thee, and for them.",
  "Thus did Noah; according to all that God commanded him, so did he."
],
        7:[
  "And the Lord said unto Noah, Come thou and all thy house into the ark; for thee have I seen righteous before me in this generation.",
  "Of every clean beast thou shalt take to thee by sevens, the male and his female: and of beasts that are not clean by two, the male and his female.",
  "Of fowls also of the air by sevens, the male and the female; to keep seed alive upon the face of all the earth.",
  "For yet seven days, and I will cause it to rain upon the earth forty days and forty nights; and every living substance that I have made will I destroy from off the face of the earth.",
  "And Noah did according unto all that the Lord commanded him.",
  "And Noah was six hundred years old when the flood of waters was upon the earth.",
  "And Noah went in, and his sons, and his wife, and his sons' wives with him, into the ark, because of the waters of the flood.",
  "Of clean beasts, and of beasts that are not clean, and of fowls, and of every thing that creepeth upon the earth,",
  "There went in two and two unto Noah into the ark, the male and the female, as God had commanded Noah.",
  "And it came to pass after seven days, that the waters of the flood were upon the earth.",
  "In the six hundredth year of Noah's life, in the second month, the seventeenth day of the month, the same day were all the fountains of the great deep broken up, and the windows of heaven were opened.",
  "And the rain was upon the earth forty days and forty nights.",
  "In the selfsame day entered Noah, and Shem, and Ham, and Japheth, the sons of Noah, and Noah's wife, and the three wives of his sons with them, into the ark;",
  "They, and every beast after his kind, and all the cattle after their kind, and every creeping thing that creepeth upon the earth after his kind, and every fowl after his kind, every bird of every sort.",
  "And they went in unto Noah into the ark, two and two of all flesh, wherein is the breath of life.",
  "And they that went in, went in male and female of all flesh, as God had commanded him: and the Lord shut him in.",
  "And the flood was forty days upon the earth; and the waters increased, and bare up the ark, and it was lift up above the earth.",
  "And the waters prevailed, and were increased greatly upon the earth; and the ark went upon the face of the waters.",
  "And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered.",
  "Fifteen cubits upward did the waters prevail; and the mountains were covered.",
  "And all flesh died that moved upon the earth, both of fowl, and of cattle, and of beast, and of every creeping thing that creepeth upon the earth, and every man:",
  "All in whose nostrils was the breath of life, of all that was in the dry land, died.",
  "And every living substance was destroyed which was upon the face of the ground, both man, and cattle, and the creeping things, and the fowl of the heaven; and they were destroyed from the earth: and Noah only remained alive, and they that were with him in the ark.",
  "And the waters prevailed upon the earth an hundred and fifty days."
],
    8: [
  "And God remembered Noah, and every living thing, and all the cattle that was with him in the ark: and God made a wind to pass over the earth, and the waters assuaged;",
  "The fountains also of the deep and the windows of heaven were stopped, and the rain from heaven was restrained;",
  "And the waters returned from off the earth continually: and after the end of the hundred and fifty days the waters were abated.",
  "And the ark rested in the seventh month, on the seventeenth day of the month, upon the mountains of Ararat.",
  "And the waters decreased continually until the tenth month: in the tenth month, on the first day of the month, were the tops of the mountains seen.",
  "And it came to pass at the end of forty days, that Noah opened the window of the ark which he had made:",
  "And he sent forth a raven, which went forth to and fro, until the waters were dried up from off the earth.",
  "Also he sent forth a dove from him, to see if the waters were abated from off the face of the ground;",
  "But the dove found no rest for the sole of her foot, and she returned unto him into the ark, for the waters were on the face of the whole earth: then he put forth his hand, and took her, and pulled her in unto him into the ark.",
  "And he stayed yet other seven days; and again he sent forth the dove out of the ark;",
  "And the dove came in to him in the evening; and, lo, in her mouth was an olive leaf pluckt off: so Noah knew that the waters were abated from off the earth.",
  "And he stayed yet other seven days; and sent forth the dove; which returned not again unto him any more.",
  "And it came to pass in the six hundredth and first year, in the first month, the first day of the month, the waters were dried up from off the earth: and Noah removed the covering of the ark, and looked, and, behold, the face of the ground was dry.",
  "And in the second month, on the seven and twentieth day of the month, was the earth dried.",
  "And God spake unto Noah, saying,",
  "Go forth of the ark, thou, and thy sons, and thy wife, and thy sons' wives with thee.",
  "Bring forth with thee every living thing that is with thee, of all flesh, both of fowl, and of cattle, and of every creeping thing that creepeth upon the earth; that they may breed abundantly in the earth, and be fruitful, and multiply upon the earth.",
  "And Noah went forth, and his sons, and his wife, and his sons' wives with him:",
  "Every beast, every creeping thing, and every fowl, and whatsoever creepeth upon the earth, after their kinds, went forth out of the ark.",
  "And Noah builded an altar unto the Lord; and took of every clean beast, and of every clean fowl, and offered burnt offerings on the altar.",
  "And the Lord smelled a sweet savour; and the Lord said in his heart, I will not again curse the ground any more for man's sake; for the imagination of man's heart is evil from his youth; neither will I again smite any more every thing living, as I have done.",
  "While the earth remaineth, seedtime and harvest, and cold and heat, and summer and winter, and day and night shall not cease."
],
   9: [
  "And God blessed Noah and his sons, and said unto them, Be fruitful, and multiply, and replenish the earth.",
  "And the fear of you and the dread of you shall be upon every beast of the earth, and upon every fowl of the air, upon all that moveth upon the earth, and upon all the fishes of the sea; into your hand are they delivered.",
  "Every moving thing that liveth shall be meat for you; even as the green herb have I given you all things.",
  "But flesh with the life thereof, which is the blood thereof, shall ye not eat.",
  "And surely your blood of your lives will I require; at the hand of every beast will I require it, and at the hand of man; at the hand of every man's brother will I require the life of man.",
  "Whoso sheddeth man's blood, by man shall his blood be shed: for in the image of God made he man.",
  "And you, be ye fruitful, and multiply; bring forth abundantly in the earth, and multiply therein.",
  "And God spake unto Noah, and to his sons with him, saying,",
  "And I, behold, I establish my covenant with you, and with your seed after you;",
  "And with every living creature that is with you, of the fowl, of the cattle, and of every beast of the earth with you; from all that go out of the ark, to every beast of the earth.",
  "And I will establish my covenant with you; neither shall all flesh be cut off any more by the waters of a flood; neither shall there any more be a flood to destroy the earth.",
  "And God said, This is the token of the covenant which I make between me and you and every living creature that is with you, for perpetual generations:",
  "I do set my bow in the cloud, and it shall be for a token of a covenant between me and the earth.",
  "And it shall come to pass, when I bring a cloud over the earth, that the bow shall be seen in the cloud:",
  "And I will remember my covenant, which is between me and you and every living creature of all flesh; and the waters shall no more become a flood to destroy all flesh.",
  "And the bow shall be in the cloud; and I will look upon it, that I may remember the everlasting covenant between God and every living creature of all flesh that is upon the earth.",
  "And God said unto Noah, This is the token of the covenant, which I have established between me and all flesh that is upon the earth.",
  "And the sons of Noah, that went forth of the ark, were Shem, and Ham, and Japheth: and Ham is the father of Canaan.",
  "These are the three sons of Noah: and of them was the whole earth overspread.",
  "And Noah began to be an husbandman, and he planted a vineyard:",
  "And he drank of the wine, and was drunken; and he was uncovered within his tent.",
  "And Ham, the father of Canaan, saw the nakedness of his father, and told his two brethren without.",
  "And Shem and Japheth took a garment, and laid it upon both their shoulders, and went backward, and covered the nakedness of their father; and their faces were backward, and they saw not their father's nakedness.",
  "And Noah awoke from his wine, and knew what his younger son had done unto him.",
  "And he said, Cursed be Canaan; a servant of servants shall he be unto his brethren.",
  "And he said, Blessed be the Lord God of Shem; and Canaan shall be his servant.",
  "God shall enlarge Japheth, and he shall dwell in the tents of Shem; and Canaan shall be his servant.",
  "And Noah lived after the flood three hundred and fifty years.",
  "And all the days of Noah were nine hundred and fifty years: and he died."
   ],
    10: [
      "Now these are the generations of the sons of Noah, Shem, Ham, and Japheth: and unto them were sons born after the flood.",
      "The sons of Japheth; Gomer, and Magog, and Madai, and Javan, and Tubal, and Meshech, and Tiras.",
      "And the sons of Gomer; Ashkenaz, and Riphath, and Togarmah.",
      "And the sons of Javan; Elishah, and Tarshish, Kittim, and Dodanim.",
      "By these were the isles of the Gentiles divided in their lands; every one after his tongue, after their families, in their nations.",
      "And the sons of Ham; Cush, and Mizraim, and Phut, and Canaan.",
      "And the sons of Cush; Seba, and Havilah, and Sabtah, and Raamah, and Sabtecha: and the sons of Raamah; Sheba, and Dedan.",
      "And Cush begat Nimrod: he began to be a mighty man upon the earth.",
      "And Mizraim begat Ludim, and Anamim, and Lehabim, and Naphtuhim,",
      "And Pathrusim, and Casluhim, (out of whom came Philistim,) and Caphtorim.",
      "And Canaan begat Sidon his firstborn, and Heth,",
      "And the Jebusite, and the Amorite, and the Girgasite,",
      "And the Hivite, and the Arkite, and the Sinite,",
      "And the Arvadite, and the Zemarite, and the Hamathite: and afterward were the families of the Canaanites spread abroad.",
      "And the border of the Canaanites was from Sidon, as thou comest to Gerar, unto Gaza; as thou goest, unto Sodom, and Gomorrah, and Admah, and Zeboim, even unto Lasha.",
      "These are the sons of Ham, after their families, after their tongues, in their countries, and in their nations.",
      "And the sons of Shem; Elam, and Asshur, and Arphaxad, and Lud, and Aram.",
      "And the sons of Aram; Uz, and Hul, and Gether, and Mash.",
      "And Arphaxad begat Salah; and Salah begat Eber.",
      "And unto Eber were born two sons: the name of one was Peleg; for in his days was the earth divided; and his brother's name was Joktan.",
      "And Joktan begat Almodad, and Sheleph, and Hazarmaveth, and Jerah,",
      "And Hadoram, and Uzal, and Diklah,",
      "And Obal, and Abimael, and Sheba,",
      "And Ophir, and Havilah, and Jobab: all these were the sons of Joktan.",
      "And their dwelling was from Mesha, as thou goest unto Sephar a mount of the east.",
      "These are the sons of Shem, after their families, after their tongues, in their lands, after their nations.",
      "These are the families of the sons of Noah, after their generations, in their nations: and by these were the nations divided in the earth after the flood."
    ],
      11: [
      "And the whole earth was of one language, and of one speech.",
      "And it came to pass, as they journeyed from the east, that they found a plain in the land of Shinar; and they dwelt there.",
      "And they said one to another, Go to, let us make brick, and burn them thoroughly. And they had brick for stone, and slime had they for morter.",
      "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
      "And the Lord came down to see the city and the tower, which the children of men builded.",
      "And the Lord said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do.",
      "Go to, let us go down, and there confound their language, that they may not understand one another's speech.",
      "So the Lord scattered them abroad from thence upon the face of all the earth: and they left off to build the city.",
      "Therefore is the name of it called Babel; because the Lord did there confound the language of all the earth: and from thence did the Lord scatter them abroad upon the face of all the earth.",
      "These are the generations of Shem: Shem was an hundred years old, and begat Arphaxad two years after the flood:",
      "And Shem lived after he begat Arphaxad five hundred years, and begat sons and daughters.",
      "And Arphaxad lived five and thirty years, and begat Salah:",
      "And Arphaxad lived after he begat Salah four hundred and three years, and begat sons and daughters.",
      "And Salah lived thirty years, and begat Eber:",
      "And Salah lived after he begat Eber four hundred and three years, and begat sons and daughters.",
      "And Eber lived four and thirty years, and begat Peleg:",
      "And Eber lived after he begat Peleg four hundred and thirty years, and begat sons and daughters.",
      "And Peleg lived thirty years, and begat Reu:",
      "And Peleg lived after he begat Reu two hundred and nine years, and begat sons and daughters.",
      "And Reu lived two and thirty years, and begat Serug:",
      "And Reu lived after he begat Serug two hundred and seven years, and begat sons and daughters.",
      "And Serug lived thirty years, and begat Nahor:",
      "And Serug lived after he begat Nahor two hundred years, and begat sons and daughters.",
      "And Nahor lived nine and twenty years, and begat Terah:",
      "And Nahor lived after he begat Terah an hundred and nineteen years, and begat sons and daughters.",
      "And Terah lived seventy years, and begat Abram, Nahor, and Haran.",
      "Now these are the generations of Terah: Terah begat Abram, Nahor, and Haran; and Haran begat Lot.",
      "And Haran died before his father Terah in the land of his nativity, in Ur of the Chaldees.",
      "And Abram and Nahor took them wives: the name of Abram's wife was Sarai; and the name of Nahor's wife, Milcah, the daughter of Haran, the father of Milcah, and the father of Iscah.",
      "But Sarai was barren; she had no child.",
      "And Terah took Abram his son, and Lot the son of Haran his son's son, and Sarai his daughter in law, his son Abram's wife; and they went forth with them from Ur of the Chaldees, to go into the land of Canaan; and they came unto Haran, and dwelt there.",
      "And the days of Terah were two hundred and five years: and Terah died in Haran."
      ],
      12: [
      "Now the Lord had said unto Abram, Get thee out of thy country, and from thy kindred, and from thy father's house, unto a land that I will shew thee.",
      "And I will make of thee a great nation, and I will bless thee, and make thy name great; and thou shalt be a blessing.",
      "And I will bless them that bless thee, and curse him that curseth thee: and in thee shall all families of the earth be blessed.",
      "So Abram departed, as the Lord had spoken unto him; and Lot went with him: and Abram was seventy and five years old when he departed out of Haran.",
      "And Abram took Sarai his wife, and Lot his brother's son, and all their substance that they had gathered, and the souls that they had gotten in Haran; and they went forth to go into the land of Canaan; and into the land of Canaan they came.",
      "And Abram passed through the land unto the place of Sichem, unto the plain of Moreh. And the Canaanite was then in the land.",
      "And the Lord appeared unto Abram, and said, Unto thy seed will I give this land: and there builded he an altar unto the Lord, who appeared unto him.",
      "And he removed from thence unto a mountain on the east of Bethel, and pitched his tent, having Bethel on the west, and Hai on the east: and there he built an altar unto the Lord, and called upon the name of the Lord.",
      "And Abram journeyed, going on still toward the south.",
      "And there was a ffamine in the land: and Abram went down into Egypt to sojourn there; for the famine was grievous in the land.",
      "And it came to pass, when he was come near to enter into Egypt, that he said unto Sarai his wife, Behold now, I know that thou art a fair woman to look upon:",
      "Therefore it shall come to pass, when the Egyptians shall see thee, that they shall say, This is his wife: and they will kill me, but they will save thee alive.",
      "Say, I pray thee, thou art my sister: that it may be well with me for thy sake; and my soul shall live because of thee.",
      "And it came to pass, that, when Abram was come into Egypt, the Egyptians beheld the woman that she was very fair.",
      "The princes also of Pharaoh saw her, and commended her before Pharaoh: and the woman was taken into Pharaoh's house.",
      "And he entreated Abram well for her sake: and he had sheep, and oxen, and he asses, and menservants, and maidservants, and she asses, and camels.",
      "And the Lord plagued Pharaoh and his house with great plagues because of Sarai Abram's wife.",
      "And Pharaoh called Abram, and said, What is this that thou hast done unto me? why didst thou not tell me that she was thy wife?",
      "Why saidst thou, She is my sister? so I might have taken her to me to wife: now therefore behold thy wife, take her, and go thy way.",
      "And Pharaoh commanded his men concerning him: and they sent him away, and his wife, and all that he had."
      ],
      13: [
      "And Abram went up out of Egypt, he, and his wife, and all that he had, and Lot with him, into the south.",
      "And Abram was very rich in cattle, in silver, and in gold.",
      "And he went on his journeys from the south even to Bethel, unto the place where his tent had been at the beginning, between Bethel and Hai;",
      "Unto the place of the altar, which he had made there at the first: and there Abram called on the name of the Lord.",
      "And Lot also, which went with Abram, had flocks, and herds, and tents.",
      "And the land was not able to bear them, that they might dwell together: for their substance was great, so that they could not dwell together.",
      "And there was a strife between the herdmen of Abram's cattle and the herdmen of Lot's cattle: and the Canaanite and the Perizzite dwelled then in the land.",
      "And Abram said unto Lot, Let there be no strife, I pray thee, between me and thee, and between my herdmen and thy herdmen; for we be brethren.",
      "Is not the whole land before thee? separate thyself, I pray thee, from me: if thou wilt take the left hand, then I will go to the right; or if thou depart to the right hand, then I will go to the left.",
      "And Lot lifted up his eyes, and beheld all the plain of Jordan, that it was well watered every where, before the Lord destroyed Sodom and Gomorrah, even as the garden of the Lord, like the land of Egypt, as thou comest unto Zoar.",
      "Then Lot chose him all the plain of Jordan; and Lot journeyed east: and they separated themselves the one from the other.",
      "Abram dwelled in the land of Canaan, and Lot dwelled in the cities of the plain, and pitched his tent toward Sodom.",
      "But the men of Sodom were wicked and sinners before the Lord exceedingly.",
      "And the Lord said unto Abram, after that Lot was separated from him, Lift up now thine eyes, and look from the place where thou art northward, and southward, and eastward, and westward:",
      "For all the land which thou seest, to thee will I give it, and to thy seed for ever.",
      "And I will make thy seed as the dust of the earth: so that if a man can number the dust of the earth, then shall thy seed also be numbered.",
      "Arise, walk through the land in the length of it and in the breadth of it; for I will give it unto thee.",
      "Then Abram moved his tent, and came and dwelt in the plain of Mamre, which is in Hebron, and built there an altar unto the Lord."
      ],
      14: [
      "And it came to pass in the days of Amraphel king of Shinar, Arioch king of Ellasar, Chedorlaomer king of Elam, and Tidal king of nations;",
      "That these made war with Bera king of Sodom, and with Birsha king of Gomorrah, Shinab king of Admah, and Shemeber king of Zeboiim, and the king of Bela, which is Zoar.",
      "All these were joined together in the vale of Siddim, which is the salt sea.",
      "Twelve years they served Chedorlaomer, and in the thirteenth year they rebelled.",
      "And in the fourteenth year came Chedorlaomer, and the kings that were with him, and smote the Rephaims in Ashteroth Karnaim, and the Zuzims in Ham, and the Emims in Shaveh Kiriathaim,",
      "And the Horites in their mount Seir, unto Elparan, which is by the wilderness.",
      "And they returned, and came to Enmishpat, which is Kadesh, and smote all the country of the Amalekites, and also the Amorites, that dwelt in Hazezontamar.",
      "Then went the king of Sodom and the king of Gomorrah, and the king of Admah, and the king of Zeboiim, and the king of Bela, which is Zoar, and they joined battle with them in the vale of Siddim;",
      "With Chedorlaomer the king of Elam, and with Tidal king of nations, and Amraphel king of Shinar, and Arioch king of Ellasar; four kings against five.",
      "And the vale of Siddim was full of slimepits; and the kings of Sodom and Gomorrah fled, and fell there; and they that remained fled to the mountain.",
      "And they took all the goods of Sodom and Gomorrah, and all their victuals, and went their way.",
      "And they took Lot, Abram's brother's son, who dwelt in Sodom, and his goods, and departed.",
      "And there came one that had escaped, and told Abram the Hebrew; for he dwelt in the plain of Mamre the Amorite, brother of Eshcol, and brother of Aner: and these were confederate with Abram.",
      "And when Abram heard that his brother was taken captive, he armed his trained servants, born in his own house, three hundred and eighteen, and pursued them unto Dan.",
      "And he divided himself against them, he and his servants, by night, and smote them, and pursued them unto Hobah, which is on the left hand of Damascus.",
      "And he brought back all the goods, and also brought again his brother Lot, and his goods, and the people.",
      "And the king of Sodom went out to meet him after his return from the slaughter of Chedorlaomer, and of the kings that were with him, at the valley of Shaveh, which is the king's dale.",
      "And Melchizedek king of Salem brought forth bread and wine: and he was the priest of the most high God.",
      "And he blessed him, and said, Blessed be Abram of the most high God, possessor of heaven and earth:",
      "And blessed be the most high God, which hath delivered thine enemies into thy hand. And he gave him tithes of all.",
      "And the king of Sodom said unto Abram, Give me the persons, and take the goods to thyself.",
      "And Abram said to the king of Sodom, I have lift up mine hand unto the Lord, the most high God, the possessor of heaven and earth,",
      "That I will not take from a thread even to a shoelatchet, and that I will not take any thing that is thine, lest thou shouldest say, I have made Abram rich:",
      "Save only that which the weapons of my enemies have taken away; unto me be the portion of the men which went with me: let them take their portion."
      ]
      }
    },
    {
      name: "Exodus",
      totalChapters: 40,
      verses: {
        20: [
          "And God spake all these words, saying,",
          "I am the LORD thy God, which have brought thee out of the land of Egypt, out of the house of bondage.",
          "Thou shalt have no other gods before me.",
          "Thou shalt not make unto thee any graven image, or any likeness of any thing that is in heaven above, or that is in the earth beneath, or that is in the water under the earth.",
          "Thou shalt not bow down thyself to them, nor serve them: for I the LORD thy God am a jealous God, visiting the iniquity of the fathers upon the children unto the third and fourth generation of them that hate me;",
          "And shewing mercy unto thousands of them that love me, and keep my commandments.",
          "Thou shalt not take the name of the LORD thy God in vain; for the LORD will not hold him guiltless that taketh his name in vain.",
          "Remember the sabbath day, to keep it holy."
        ]
      }
    },
    {
      name: "Psalms",
      totalChapters: 150,
      verses: {
        1: [
          "Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful.",
          "But his delight is in the law of the LORD; and in his law doth he meditate day and night.",
          "And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper.",
          "The ungodly are not so: but are like the chaff which the wind driveth away.",
          "Therefore the ungodly shall not stand in the judgment, nor sinners in the congregation of the righteous.",
          "For the LORD knoweth the way of the righteous: but the way of the ungodly shall perish."
        ],
        23: [
          "The LORD is my shepherd; I shall not want.",
          "He maketh me to lie down in green pastures: he leadeth me beside the still waters.",
          "He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.",
          "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.",
          "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.",
          "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever."
        ],
        91: [
          "He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.",
          "I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.",
          "Surely he shall deliver thee from the snare of the fowler, and from the noisome pestilence.",
          "He shall cover thee with his feathers, and under his wings shalt thou trust: his truth shall be thy shield and buckler."
        ],
        119: [
          "Blessed are the undefiled in the way, who walk in the law of the LORD.",
          "Blessed are they that keep his testimonies, and that seek him with the whole heart.",
          "They also do no iniquity: they walk in his ways.",
          "Thou hast commanded us to keep thy precepts diligently."
        ]
      }
    },
    {
      name: "Proverbs",
      totalChapters: 31,
      verses: {
        1: [
          "The proverbs of Solomon the son of David, king of Israel;",
          "To know wisdom and instruction; to perceive the words of understanding;",
          "To receive the instruction of wisdom, justice, and judgment, and equity;",
          "To give subtilty to the simple, to the young man knowledge and discretion.",
          "A wise man will hear, and will increase learning; and a man of understanding shall attain unto wise counsels:"
        ],
        3: [
          "My son, forget not my law; but let thine heart keep my commandments:",
          "For length of days, and long life, and peace, shall they add to thee.",
          "Let not mercy and truth forsake thee: bind them about thy neck; write them upon the table of thine heart:",
          "So shalt thou find favour and good understanding in the sight of God and man.",
          "Trust in the LORD with all thine heart; and lean not unto thine own understanding.",
          "In all thy ways acknowledge him, and he shall direct thy paths.",
          "Be not wise in thine own eyes: fear the LORD, and depart from evil."
        ],
        4: [
          "Hear, ye children, the instruction of a father, and attend to know understanding.",
          "For I give you good doctrine, forsake ye not my law.",
          "For I was my father's son, tender and only beloved in the sight of my mother.",
          "He taught me also, and said unto me, Let thine heart retain my words: keep my commandments, and live."
        ]
      }
    },
    {
      name: "Isaiah",
      totalChapters: 66,
      verses: {
        40: [
          "Comfort ye, comfort ye my people, saith your God.",
          "Speak ye comfortably to Jerusalem, and cry unto her, that her warfare is accomplished, that her iniquity is pardoned: for she hath received of the LORD'S hand double for all her sins.",
          "The voice of him that crieth in the wilderness, Prepare ye the way of the LORD, make straight in the desert a highway for our God."
        ],
        53: [
          "Who hath believed our report? and to whom is the arm of the LORD revealed?",
          "For he shall grow up before him as a tender plant, and as a root out of a dry ground: he hath no form nor comeliness; and when we shall see him, there is no beauty that we should desire him.",
          "He is despised and rejected of men; a man of sorrows, and acquainted with grief: and we hid as it were our faces from him; he was despised, and we esteemed him not."
        ]
      }
    }
  ],
  newTestament: [
    {
      name: "Matthew",
      totalChapters: 28,
      verses: {
        5: [
          "And seeing the multitudes, he went up into a mountain: and when he was set, his disciples came unto him:",
          "And he opened his mouth, and taught them, saying,",
          "Blessed are the poor in spirit: for theirs is the kingdom of heaven.",
          "Blessed are they that mourn: for they shall be comforted.",
          "Blessed are the meek: for they shall inherit the earth.",
          "Blessed are they which do hunger and thirst after righteousness: for they shall be filled.",
          "Blessed are the merciful: for they shall obtain mercy.",
          "Blessed are the pure in heart: for they shall see God."
        ],
        6: [
          "Take heed that ye do not your alms before men, to be seen of them: otherwise ye have no reward of your Father which is in heaven.",
          "Therefore when thou doest thine alms, do not sound a trumpet before thee, as the hypocrites do in the synagogues and in the streets, that they may have glory of men. Verily I say unto you, They have their reward.",
          "But when thou doest alms, let not thy left hand know what thy right hand doeth:",
          "That thine alms may be in secret: and thy Father which seeth in secret himself shall reward thee openly."
        ],
        28: [
          "In the end of the sabbath, as it began to dawn toward the first day of the week, came Mary Magdalene and the other Mary to see the sepulchre.",
          "And, behold, there was a great earthquake: for the angel of the Lord descended from heaven, and came and rolled back the stone from the door, and sat upon it.",
          "His countenance was like lightning, and his raiment white as snow:"
        ]
      }
    },
    {
      name: "Mark",
      totalChapters: 16,
      verses: {
        1: [
          "The beginning of the gospel of Jesus Christ, the Son of God;",
          "As it is written in the prophets, Behold, I send my messenger before thy face, which shall prepare thy way before thee.",
          "The voice of one crying in the wilderness, Prepare ye the way of the Lord, make his paths straight."
        ],
        16: [
          "And when the sabbath was past, Mary Magdalene, and Mary the mother of James, and Salome, had bought sweet spices, that they might come and anoint him.",
          "And very early in the morning the first day of the week, they came unto the sepulchre at the rising of the sun.",
          "And they said among themselves, Who shall roll us away the stone from the door of the sepulchre?"
        ]
      }
    },
    {
      name: "Luke",
      totalChapters: 24,
      verses: {
        2: [
          "And it came to pass in those days, that there went out a decree from Caesar Augustus that all the world should be taxed.",
          "And all went to be taxed, every one into his own city.",
          "And Joseph also went up from Galilee, out of the city of Nazareth, into Judaea, unto the city of David, which is called Bethlehem;",
          "To be taxed with Mary his espoused wife, being great with child.",
          "And so it was, that, while they were there, the days were accomplished that she should be delivered.",
          "And she brought forth her firstborn son, and wrapped him in swaddling clothes, and laid him in a manger; because there was no room for them in the inn."
        ]
      }
    },
    {
      name: "John",
      totalChapters: 21,
      verses: {
        1: [
          "In the beginning was the Word, and the Word was with God, and the Word was God.",
          "The same was in the beginning with God.",
          "All things were made by him; and without him was not any thing made that was made.",
          "In him was life; and the life was the light of men.",
          "And the light shineth in darkness; and the darkness comprehended it not."
        ],
        3: [
          "There was a man of the Pharisees, named Nicodemus, a ruler of the Jews:",
          "The same came to Jesus by night, and said unto him, Rabbi, we know that thou art a teacher come from God: for no man can do these miracles that thou doest, except God be with him.",
          "Jesus answered and said unto him, Verily, verily, I say unto thee, Except a man be born again, he cannot see the kingdom of God.",
          "Nicodemus saith unto him, How can a man be born when he is old? can he enter the second time into his mother's womb, and be born?",
          "Jesus answered, Verily, verily, I say unto thee, Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God.",
          "That which is born of the flesh is flesh; and that which is born of the Spirit is spirit."
        ],
        14: [
          "Let not your heart be troubled: ye believe in God, believe also in me.",
          "In my Father's house are many mansions: if it were not so, I would have told you. I go to prepare a place for you.",
          "And if I go and prepare a place for you, I will come again, and receive you unto myself; that where I am, there ye may be also.",
          "And whither I go ye know, and the way ye know."
        ]
      }
    },
    {
      name: "Acts",
      totalChapters: 28,
      verses: {
        2: [
          "And when the day of Pentecost was fully come, they were all with one accord in one place.",
          "And suddenly there came a sound from heaven as of a rushing mighty wind, and it filled all the house where they were sitting.",
          "And there appeared unto them cloven tongues like as of fire, and it sat upon each of them.",
          "And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance."
        ]
      }
    },
    {
      name: "Romans",
      totalChapters: 16,
      verses: {
        3: [
          "What advantage then hath the Jew? or what profit is there of circumcision?",
          "Much every way: chiefly, because that unto them were committed the oracles of God.",
          "For what if some did not believe? shall their unbelief make the faith of God without effect?",
          "God forbid: yea, let God be true, but every man a liar; as it is written, That thou mightest be justified in thy sayings, and mightest overcome when thou art judged."
        ],
        8: [
          "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.",
          "For the law of the Spirit of life in Christ Jesus hath made me free from the law of sin and death.",
          "For what the law could not do, in that it was weak through the flesh, God sending his own Son in the likeness of sinful flesh, and for sin, condemned sin in the flesh:",
          "That the righteousness of the law might be fulfilled in us, who walk not after the flesh, but after the Spirit."
        ],
        12: [
          "I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service.",
          "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God."
        ]
      }
    },
    {
      name: "1 Corinthians",
      totalChapters: 16,
      verses: {
        13: [
          "Though I speak with the tongues of men and of angels, and have not charity, I am become as sounding brass, or a tinkling cymbal.",
          "And though I have the gift of prophecy, and understand all mysteries, and all knowledge; and though I have all faith, so that I could remove mountains, and have not charity, I am nothing.",
          "And though I bestow all my goods to feed the poor, and though I give my body to be burned, and have not charity, it profiteth me nothing.",
          "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up."
        ]
      }
    },
    {
      name: "Ephesians",
      totalChapters: 6,
      verses: {
        6: [
          "Children, obey your parents in the Lord: for this is right.",
          "Honour thy father and mother; which is the first commandment with promise;",
          "That it may be well with thee, and thou mayest live long on the earth.",
          "And, ye fathers, provoke not your children to wrath: but bring them up in the nurture and admonition of the Lord."
        ]
      }
    },
    {
      name: "Philippians",
      totalChapters: 4,
      verses: {
        4: [
          "Rejoice in the Lord always: and again I say, Rejoice.",
          "Let your moderation be known unto all men. The Lord is at hand.",
          "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
          "And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus."
        ]
      }
    },
    {
      name: "Revelation",
      totalChapters: 22,
      verses: {
        1: [
          "The Revelation of Jesus Christ, which God gave unto him, to shew unto his servants things which must shortly come to pass; and he sent and signified it by his angel unto his servant John:",
          "Who bare record of the word of God, and of the testimony of Jesus Christ, and of all things that he saw.",
          "Blessed is he that readeth, and they that hear the words of this prophecy, and keep those things which are written therein: for the time is at hand."
        ],
        21: [
          "And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away; and there was no more sea.",
          "And I John saw the holy city, new Jerusalem, coming down from God out of heaven, prepared as a bride adorned for her husband.",
          "And I heard a great voice out of heaven saying, Behold, the tabernacle of God is with men, and he will dwell with them, and they shall be his people, and God himself shall be with them, and be their God."
        ]
      }
    }
  ]
};

// State variables
let currentBibleBook = null;
let currentChapter = 1;
let currentVerseIndex = 0;
let currentVerseText = '';
let bibleTyped = '';
let bibleStartTime = null;
let currentTestament = 'old';
let bibleTimerDuration = 60;
let bibleTimeLeft = 60;
let bibleTimerInterval = null;

// Initialize Bible page
function loadBiblePage() {
  updateBibleStats(); // Update stats on load
  loadBibleBooks(currentTestament);
  setupBibleEventListeners();
}

function setupBibleEventListeners() {
  // Set up testament tabs
  document.querySelectorAll('.bible-testament-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.bible-testament-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      currentTestament = this.dataset.testament;
      loadBibleBooks(currentTestament);
    });
    // Set up timer select
  const timerSelect = document.getElementById('bible-timer-select');
  if (timerSelect && !timerSelect.dataset.listenerAdded) {
    timerSelect.dataset.listenerAdded = 'true';
    timerSelect.addEventListener('change', (e) => {
      bibleTimerDuration = parseInt(e.target.value);
      bibleTimeLeft = bibleTimerDuration;
      document.getElementById('bible-countdown').textContent = 
        bibleTimerDuration === 0 ? '∞' : bibleTimerDuration + 's';
    });
  }
  });
  
  // Set up back button
  document.getElementById('back-to-books')?.addEventListener('click', () => {
    document.getElementById('bible-books-grid').style.display = 'grid';
    document.getElementById('bible-practice-card').style.display = 'none';
    bibleTyped = '';
    document.getElementById('bible-input').value = '';
  });
  
  // Set up bible input
  const bibleInput = document.getElementById('bible-input');
  if (bibleInput && !bibleInput.dataset.listenerAdded) {
    bibleInput.dataset.listenerAdded = 'true';
    bibleInput.addEventListener('input', handleBibleInput);
    bibleInput.addEventListener('paste', e => e.preventDefault());
  }
}

// Update Bible stats from localStorage
function updateBibleStats() {
  const statsKey = 'bible_stats_global';
  const stats = JSON.parse(localStorage.getItem(statsKey) || '{"totalVerses": 0}');
  
  document.getElementById('total-verses-typed').textContent = stats.totalVerses || 0;
}

// Load books for testament
function loadBibleBooks(testament) {
  const booksGrid = document.getElementById('bible-books-grid');
  const books = testament === 'old' ? BIBLE_DATA.oldTestament : BIBLE_DATA.newTestament;
  
  let html = '';
  books.forEach(book => {
    const availableChapters = Object.keys(book.verses).length;
    html += `
      <div class="bible-book-card" onclick="openBibleBook('${testament}', '${book.name}')">
        <h4 class="bible-book-name">${book.name}</h4>
        <div class="bible-book-meta">
          <span>${availableChapters} of ${book.totalChapters} chapters</span>
        </div>
      </div>
    `;
  });
  
  booksGrid.innerHTML = html;
}

// Open a Bible book
window.openBibleBook = function(testament, bookName) {
  const books = testament === 'old' ? BIBLE_DATA.oldTestament : BIBLE_DATA.newTestament;
  currentBibleBook = books.find(b => b.name === bookName);
  
  if (!currentBibleBook) return;
  
  // Get first available chapter
  const availableChapters = Object.keys(currentBibleBook.verses).sort((a, b) => parseInt(a) - parseInt(b));
  currentChapter = parseInt(availableChapters[0]);
  currentVerseIndex = 0;
  
  // Hide books, show practice
  document.getElementById('bible-books-grid').style.display = 'none';
  document.getElementById('bible-practice-card').style.display = 'block';
  
  // Update book name display
  updateChapterVerseDisplay();
  
  // Load first verse
  loadCurrentVerse();
};

// Update the chapter/verse display
function updateChapterVerseDisplay() {
  const availableChapters = Object.keys(currentBibleBook.verses).sort((a, b) => parseInt(a) - parseInt(b));
  const currentVerses = currentBibleBook.verses[currentChapter];
  const totalVerses = currentVerses ? currentVerses.length : 0;
  
  const displayText = `${currentBibleBook.name} ${currentChapter}:${currentVerseIndex + 1} of ${totalVerses}`;
  
  // Create or update the display element
  const practiceCard = document.getElementById('bible-practice-card');
  let chapterDisplay = practiceCard.querySelector('.bible-chapter-display');
  
  if (!chapterDisplay) {
    chapterDisplay = document.createElement('div');
    chapterDisplay.className = 'bible-chapter-display';
    chapterDisplay.style.cssText = 'text-align: center; margin: 16px 0; font-size: 1.125rem; font-weight: 600; color: var(--accent-solid);';
    
    const verseDisplay = document.getElementById('bible-verse-display');
    verseDisplay.parentNode.insertBefore(chapterDisplay, verseDisplay);
  }
  
  chapterDisplay.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; gap: 16px;">
      <button onclick="previousVerse()" class="btn btn-secondary btn-small" ${currentVerseIndex === 0 ? 'disabled' : ''}>← Previous</button>
      <span>${displayText}</span>
      <button onclick="nextVerse()" class="btn btn-secondary btn-small" ${currentVerseIndex >= totalVerses - 1 ? 'disabled' : ''}>Next →</button>
    </div>
    <div style="margin-top: 12px;">
      <button onclick="changeChapter(-1)" class="btn btn-secondary btn-small" ${!canGoPreviousChapter() ? 'disabled' : ''}>← Previous Chapter</button>
      <button onclick="changeChapter(1)" class="btn btn-secondary btn-small" ${!canGoNextChapter() ? 'disabled' : ''}>Next Chapter →</button>
    </div>
  `;
}

// Navigation functions
window.previousVerse = function() {
  if (currentVerseIndex > 0) {
    currentVerseIndex--;
    loadCurrentVerse();
  }
};

window.nextVerse = function() {
  const verses = currentBibleBook.verses[currentChapter];
  if (verses && currentVerseIndex < verses.length - 1) {
    currentVerseIndex++;
    loadCurrentVerse();
  }
};

window.changeChapter = function(direction) {
  const availableChapters = Object.keys(currentBibleBook.verses).map(Number).sort((a, b) => a - b);
  const currentIndex = availableChapters.indexOf(currentChapter);
  
  if (direction === -1 && currentIndex > 0) {
    currentChapter = availableChapters[currentIndex - 1];
    currentVerseIndex = 0;
    loadCurrentVerse();
  } else if (direction === 1 && currentIndex < availableChapters.length - 1) {
    currentChapter = availableChapters[currentIndex + 1];
    currentVerseIndex = 0;
    loadCurrentVerse();
  }
};

function canGoPreviousChapter() {
  const availableChapters = Object.keys(currentBibleBook.verses).map(Number).sort((a, b) => a - b);
  const currentIndex = availableChapters.indexOf(currentChapter);
  return currentIndex > 0;
}

function canGoNextChapter() {
  const availableChapters = Object.keys(currentBibleBook.verses).map(Number).sort((a, b) => a - b);
  const currentIndex = availableChapters.indexOf(currentChapter);
  return currentIndex < availableChapters.length - 1;
}

// Load current verse
function loadCurrentVerse() {
  const verses = currentBibleBook.verses[currentChapter];
  
  if (!verses || currentVerseIndex >= verses.length) {
    alert('Verse not available.');
    return;
  }
  
  currentVerseText = verses[currentVerseIndex];
  bibleTyped = '';
  bibleStartTime = null;
  
  updateChapterVerseDisplay();
  renderBibleVerse();
  
  const input = document.getElementById('bible-input');
  input.value = '';
  input.disabled = false;
  input.focus();
  
 // Reset stats
document.getElementById('bible-time').textContent = '0s';
document.getElementById('bible-wpm').textContent = '0';
document.getElementById('bible-accuracy').textContent = '100%';

// Reset timer
stopBibleTimer();
bibleTimeLeft = bibleTimerDuration;
document.getElementById('bible-countdown').textContent = 
  bibleTimerDuration === 0 ? '∞' : bibleTimerDuration + 's';
document.getElementById('bible-countdown').style.color = 'var(--accent-solid)';
}

// Render verse with colored characters
function renderBibleVerse() {
  const display = document.getElementById('verse-text');
  let html = '';
  
  for (let i = 0; i < currentVerseText.length; i++) {
    const char = currentVerseText[i];
    const typedChar = bibleTyped[i];
    
    let charClass = 'char';
    
    if (i === bibleTyped.length) {
      charClass += ' current';
    } else if (typedChar !== undefined) {
      if (typedChar === char) {
        charClass += ' correct';
      } else {
        charClass += ' incorrect';
      }
    }
    
    html += `<span class="${charClass}">${char === ' ' ? '&nbsp;' : escapeHtml(char)}</span>`;
  }
  
  display.innerHTML = html;
}

// Handle bible input
function handleBibleInput(e) {
 if (!bibleStartTime) {
  bibleStartTime = Date.now();
  startBibleTimer(); // Start countdown when typing begins
}
  
  bibleTyped = e.target.value;
  renderBibleVerse();
  
  // Calculate stats
  const elapsed = (Date.now() - bibleStartTime) / 1000;
  const wordsTyped = bibleTyped.length / 5;
  const wpm = elapsed > 0 ? Math.round((wordsTyped / elapsed) * 60) : 0;
  
  let correct = 0;
  for (let i = 0; i < bibleTyped.length; i++) {
    if (bibleTyped[i] === currentVerseText[i]) correct++;
  }
  const accuracy = bibleTyped.length > 0 ? Math.round((correct / bibleTyped.length) * 100) : 100;
  
  // Update display
  document.getElementById('bible-time').textContent = Math.floor(elapsed) + 's';
  document.getElementById('bible-wpm').textContent = wpm;
  document.getElementById('bible-accuracy').textContent = accuracy + '%';
  
  // Check completion
  if (bibleTyped.length >= currentVerseText.length) {
    completeBibleVerse(wpm, accuracy);
  }
}

// Complete verse
function completeBibleVerse(wpm, accuracy) {
  document.getElementById('bible-input').disabled = true;
  
  // Save verse completion to localStorage
  const statsKey = 'bible_stats_global';
  const stats = JSON.parse(localStorage.getItem(statsKey) || '{"totalVerses": 0}');
  stats.totalVerses = (stats.totalVerses || 0) + 1;
  localStorage.setItem(statsKey, JSON.stringify(stats));
  
  // Update display
  updateBibleStats();
  
  // Show completion message
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 100px;
    right: 24px;
    background: linear-gradient(135deg, #FFD700, #FFA500);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    z-index: 10000;
    box-shadow: 0 4px 16px rgba(255, 215, 0, 0.4);
    font-weight: 600;
    animation: slideIn 0.3s ease;
  `;
  toast.textContent = `✝️ Verse completed! ${wpm} WPM • ${accuracy}%`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
  
  // Auto-load next verse after 2 seconds
  const verses = currentBibleBook.verses[currentChapter];
  if (currentVerseIndex < verses.length - 1) {
    setTimeout(() => {
      currentVerseIndex++;
      loadCurrentVerse();
    }, 2000);
  }
}

// Helper function
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
// Start countdown timer
function startBibleTimer() {
  // Clear any existing timer
  if (bibleTimerInterval) {
    clearInterval(bibleTimerInterval);
  }
  
  // If timer is disabled (0), don't start
  if (bibleTimerDuration === 0) {
    document.getElementById('bible-countdown').textContent = '∞';
    return;
  }
  
  bibleTimeLeft = bibleTimerDuration;
  document.getElementById('bible-countdown').textContent = bibleTimeLeft + 's';
  
  bibleTimerInterval = setInterval(() => {
    bibleTimeLeft--;
    
    if (bibleTimeLeft <= 0) {
      clearInterval(bibleTimerInterval);
      bibleTimerInterval = null;
      document.getElementById('bible-countdown').textContent = '0s';
      document.getElementById('bible-countdown').style.color = '#ff6b6b';
      
      // Disable input
      document.getElementById('bible-input').disabled = true;
      
      // Show time's up message
      alert('Time is up! Complete the verse or move to the next one.');
    } else {
      document.getElementById('bible-countdown').textContent = bibleTimeLeft + 's';
      
      // Change color when time is running out
      if (bibleTimeLeft <= 10) {
        document.getElementById('bible-countdown').style.color = '#ff6b6b';
      } else if (bibleTimeLeft <= 30) {
        document.getElementById('bible-countdown').style.color = '#ffc107';
      } else {
        document.getElementById('bible-countdown').style.color = 'var(--accent-solid)';
      }
    }
  }, 1000);
}

// Stop timer
function stopBibleTimer() {
  if (bibleTimerInterval) {
    clearInterval(bibleTimerInterval);
    bibleTimerInterval = null;
  }
}

// Export for use in main file
window.loadBiblePage = loadBiblePage;
