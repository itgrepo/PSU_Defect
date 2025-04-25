<template>
  <v-dialog v-model="dialogPolicy" persistent max-width="1000px"  id="update">
    <v-container>
      <div class="text-policy">
        <div class="FixHead">
          <h4 class="text-center" style="color:#125488">
            ข้อตกลงและเงื่อนไขในการใช้งาน
          </h4>
            <p class="text-center font-size" style="color:#818E85">
              (กรุณาอ่านข้อตกลงและเงื่อนไขด้านล่างนี้โดยละเอียดเพื่อประโยชน์ของท่าน)
            </p>
          <v-divider></v-divider><br />
        </div>

        <div >
            <!-- <iframe id="ConsentFrame" name="ConsentFrame" :src="getConsent()" width="100%" height="55%"></iframe> -->
            <consent/>
        </div>


        <div class="footer" >
          <v-checkbox v-model="checkbox" label="ยินดีรับข้อมูลข่าวสาร" hide-details></v-checkbox>
          <v-checkbox v-model="accept" :rules="[rules.required]">
            <template v-slot:label>I agree to the&nbsp;<a href="#" @click="TermConditionofUse = true">Terms of Service</a>&nbsp;and&nbsp;<a href="#" @click="Policy = true">Privacy Policy</a>*</template>
          </v-checkbox>

          <center style="padding-bottom:10px">
            <v-btn v-if="status === 'update'" color="success" outline @click="updatePolicy(dialog = true)">save</v-btn>
            <v-btn v-else-if="status === 'updateAdmin'" color="success" outline @click="updatePolicyAdmin(dialog = true)">save</v-btn>
            <v-btn v-else-if="accept === true" color="success" outline :key="buttonKey" @click.once="dataUser( dialog = true)" >save</v-btn>
            <v-btn v-else color="success" outline @click="dataUser(dialog = true) ">save</v-btn>
          </center>
        </div>

        <twoauthen ref="twoauthen" @opendialogReset="dialogReset" />

        <v-dialog v-model="Policy" absolute max-width="900" persistent>
          <v-card>
            <v-card-title class="headline grey lighten-3">
              <h3 class="text-center" style="color: #0165ba; margin-top:35px;">นโยบายเว็บไซต์ของ  มหาวิทยาลัยสงขลานครินทร์</h3>
              <h4 class="text-center">Website Policy of PSU</h4>
            </v-card-title>
            <v-card-text>
              <v-divider></v-divider><br><br>
                <p>&nbsp;&nbsp;&nbsp;&nbsp; มหาวิทยาลัยสงขลานครินทร์ ได้จัดทำนโยบายการคุ้มครองข้อมูลส่วนบุคคลฉบับนี้ขึ้น เพื่อคุ้มครองข้อมูลส่วนบุคคล
                  ของผู้ใช้บริการทุกท่าน (Personal Information) ที่ติดต่อเข้ามายังเว็บไซต์ของ มหาวิทยาลัยสงขลานครินทร์ ดังนี้</p>
                  <b>การเก็บรวบรวมข้อมูลส่วนบุคคล</b><br /><br>
                <ol>
                  <li>
                    เพื่อความสะดวกในการให้บริการแก่ผู้ใช้บริการทุกท่านที่เข้ามาใช้บริการเว็บไซต์ของ มหาวิทยาลัยสงขลานครินทร์ ทางเว็บไซต์จึงได้จัดเก็บรวบรวมข้อมูลส่วนบุคคลของท่านไว้ เช่น อีเมลแอดเดรส (Email Address) ชื่อ
                    (Name) ที่อยู่หรือที่ทำงาน (Home or Work Address) เขตไปรษณีย์ (ZIP Code) หรือหมายเลขโทรศัพท์ (Telephone Number) เป็นต้น
                  </li>

                  <li>
                    ในกรณีที่ท่านสมัคร (Sign Up) เพื่อสมัครสมาชิกหรือเพื่อใช้บริการอย่างใดอย่างหนึ่ง  มหาวิทยาลัยสงขลานครินทร์จะเก็บรวบรวมข้อมูลส่วนบุคคลของท่านเพิ่มเติม ได้แก่ เพศ (Sex) อายุ (Gender) สิ่งที่โปรดปราน/
                    ความชอบ (Preferences/Favorites) ความสนใจ (Interests) หรือหมายเลขบัตรเครดิต (Credit Card Number) และที่อยู่ในการแจ้งค่าใช้จ่าย (Billing Address)
                  </li>

                  <li>
                    นอกจากนั้น เพื่อสำรวจความนิยมในการใช้บริการ อันจะเป็นประโยชน์ในการนำสถิติไปใช้ในการปรับปรุง
                    คุณภาพในการให้บริการของ มหาวิทยาลัยสงขลานครินทร์ จึงจำเป็นต้องจัดเก็บรวบรวมข้อมูลของท่านบางอย่าง
                    เพิ่มเติม ได้แก่ หมายเลขไอพี (IP Address) ชนิดของโปรแกรม ค้นผ่าน (Browser Type) โดเมนเนม
                    (Domain Name) บันทึกหน้าเว็บ (web page) ของเว็บไซต์ที่ผู้ใช้เยี่ยมชม เวลาที่เยี่ยมชมเว็บไซต์
                    (Access Times) และเว็บไซต์ที่ผู้ใช้บริการเข้าถึงก่อนหน้านั้น (Referring Website Addresses)
                  </li>

                  <li>
                     มหาวิทยาลัยสงขลานครินทร์ ขอแนะนำให้ท่านตรวจสอบนโยบายการคุ้มครองข้อมูลส่วนบุคคล (PrivacyPolicy)
                    ของเว็บไซต์อื่นที่เชื่อมโยงจากเว็บไซต์นี้ เพื่อจะได้ทราบและเข้าใจว่าเว็บไซต์ดังกล่าวเก็บรวบรวม ใช้ หรือ
                    ดำเนินการเกี่ยวกับข้อมูลส่วนบุคคลของท่านอย่างไร ทั้งนี้  มหาวิทยาลัยสงขลานครินทร์ไม่สามารถรับรอง ข้อความ
                    หรือรับรองการดำเนินการใดๆ ตามที่ได้มีการประกาศไว้ในเว็บไซต์ดังกล่าวได้ และไม่ขอรับผิดชอบใดๆ
                    หากเว็บไซต์เหล่านั้นไม่ได้ปฏิบัติการหรือดำเนินการใดๆ ตามนโยบายการคุ้มครองข้อมูลส่วนบุคคลที่
                    เว็บไซต์ดังกล่าวได้ประกาศไว้
                  </li>
                </ol>
                <br>
                <b>การใช้ข้อมูลส่วนบุคคล</b>
                <ol>
                <br />
                  <li>
                     มหาวิทยาลัยสงขลานครินทร์ จะใช้ข้อมูลส่วนบุคคลของท่านเพียงเท่าที่จำเป็น เช่น ชื่อ และ ที่อยู่ เพื่อใช้ในการ
                    ติดต่อ ให้บริการประชาสัมพันธ์ หรือให้ข้อมูลข่าวสารต่างๆ รวมทั้งสำรวจความคิดเห็นของท่านใน
                    กิจการหรือกิจกรรมของ  มหาวิทยาลัยสงขลานครินทร์ เท่านั้น
                  </li>

                  <li>
                     มหาวิทยาลัยสงขลานครินทร์ ขอรับรองว่าจะไม่นำข้อมูลส่วนบุคคลของท่านที่  มหาวิทยาลัยสงขลานครินทร์ ได้เก็บรวบรวมไว้ ไปขายหรือเผยแพร่ให้กับบุคคลภายนอกโดยเด็ดขาด เว้นแต่จะได้รับอนุญาตจากท่านเท่านั้น
                  </li>

                  <li>
                    ในกรณีที่  มหาวิทยาลัยสงขลานครินทร์ ได้ว่าจ้างหน่วยงานอื่นเพื่อให้ดำเนินการเกี่ยวกับข้อมูลส่วนบุคคลของ
                    ท่าน เช่น การจัดส่งพัสดุไปรษณีย์ การวิเคราะห์เชิงสถิติในกิจการหรือกิจกรรมของ มหาวิทยาลัยสงขลานครินทร์
                    เป็นต้น  มหาวิทยาลัยสงขลานครินทร์ จะกำหนดให้หน่วยงานที่ได้ว่าจ้างให้ดำเนินการดังกล่าว เก็บรักษาความลับ
                    และความปลอดภัยของข้อมูลส่วนบุคคลของท่าน และกำหนดข้อห้ามมิให้มีการนำข้อมูลส่วนบุคคล
                    ดังกล่าว ไปใช้นอกเหนือจากกิจกรรมหรือกิจการของ  มหาวิทยาลัยสงขลานครินทร์
                  </li>
                </ol>
                <br>
                <b>สิทธิในการควบคุมข้อมูลส่วนบุคคลของท่าน</b><br>
                <p><br>
                  &nbsp;&nbsp;&nbsp;&nbsp;เพื่อประโยชน์ในการรักษาความเป็นส่วนตัวของท่านๆ มีสิทธิเลือกที่จะให้มีการใช้หรือแชร์ข้อมูลส่วน
                  บุคคลของท่าน หรืออาจเลือกที่จะไม่รับข้อมูลหรือสื่อทางการตลาดใดๆ จาก  มหาวิทยาลัยสงขลานครินทร์ ก็ได้ โดยเพียงแต่
                  ท่านกรอกความจำนงดังกล่าวเพื่อแจ้งให้  มหาวิทยาลัยสงขลานครินทร์ ทราบในหน้าเว็บ https://www.psu.ac.th/
                </p>
                <b>การรักษาความปลอดภัยสำหรับข้อมูลส่วนบุคคล</b>
                <p><br>
                  &nbsp;&nbsp;&nbsp;&nbsp;เพื่อประโยชน์ในการรักษาความลับและความปลอดภัยสำหรับข้อมูลส่วนบุคคลของท่าน  มหาวิทยาลัยสงขลานครินทร์
                  จึงได้กำหนดระเบียบภายในหน่วยงานเพื่อกำหนดสิทธิในการเข้าถึงหรือใช้ข้อมูลส่วนบุคคลของท่าน และเพื่อรักษา
                  ความลับและความปลอดภัยของข้อมูลบางอย่างที่มีความสำคัญอย่างยิ่ง เช่น หมายเลขบัตรเครดิต เป็นต้น
                   มหาวิทยาลัยสงขลานครินทร์ จึงได้จัดให้มีช่องทางการสื่อสารแบบปลอดภัยสำหรับข้อมูลดังกล่าวด้วยการเข้ารหัสลับข้อมูล
                  ดังกล่าว เช่น จัดให้มีการใช้ Secure Socket Layer (SSL) protocol เป็นต้น
                </p>
                <b>การใช้คุกกี้ (Cookies)</b>
                <p><br>
                  &nbsp;&nbsp;&nbsp;&nbsp;“คุกกี้” คือ ข้อมูลที่  มหาวิทยาลัยสงขลานครินทร์ ส่งไปยังโปรแกรมค้นผ่านเว็บไซต์ (Web browser) ของผู้ใช้บริการ
                  และเมื่อมีการติดตั้งข้อมูลดังกล่าวไว้ในระบบของท่านแล้ว หากมีการใช้ “คุกกี้” ก็จะทำให้เว็บไซต์
                  https://www.psu.ac.th/ สามารถบันทึกหรือจดจำข้อมูลของผู้ใช้บริการไว้ จนกว่าผู้ใช้บริการจะออกจาก
                  โปรแกรมค้นผ่านเว็บไซต์ หรือจนกว่าผู้ใช้บริการจะทำการลบ “คุกกี้” นั้นเสีย หรือไม่อนุญาตให้ “คุกกี้” นั้น
                  ทำงานอีกต่อไป
                </p>
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;หากท่านเลือกใช้ “คุกกี้” แล้ว ท่านจะได้รับความสะดวกสบายในการท่องเว็บไซต์มากขึ้น เพราะ “คุกกี้”
                  จะช่วยจดจำเว็บไซต์ที่ท่านแวะหรือเยี่ยมชม ทั้งนี้  มหาวิทยาลัยสงขลานครินทร์ จะนำข้อมูลที่ “คุกกี้” ได้บันทึกหรือเก็บ
                  รวบรวมไว้ ไปใช้ในการวิเคราะห์เชิงสถิติ หรือในกิจกรรมอื่นของ  มหาวิทยาลัยสงขลานครินทร์ เพื่อ ปรับปรุงคุณภาพการ
                  ให้บริการของ  มหาวิทยาลัยสงขลานครินทร์ ต่อไป
                </p>
                <b>การปรับปรุงนโยบายการคุ้มครองข้อมูลส่วนบุคคล</b>
                <p><br>
                  &nbsp;&nbsp;&nbsp;&nbsp; มหาวิทยาลัยสงขลานครินทร์ อาจทำการปรับปรุงหรือแก้ไขนโยบายการคุ้มครองข้อมูลส่วนบุคคลโดยมิได้แจ้งให้ท่าน
                  ทราบล่วงหน้า ทั้งนี้ เพื่อความเหมาะสมและมีประสิทธิภาพในการให้บริการ ดังนั้น มหาวิทยาลัยสงขลานครินทร์ จึงขอ
                  แนะนำให้ผู้ใช้บริการอ่านนโยบายการคุ้มครองข้อมูลส่วนบุคคลทุกครั้งที่เยี่ยมชม หรือมีการใช้บริการจากเว็บไซต์
                  ของ มหาวิทยาลัยสงขลานครินทร์
                </p>
                <b>การปฏิบัติตามนโยบายคุ้มครองข้อมูลส่วนบุคคลและการติดต่อกับ  มหาวิทยาลัยสงขลานครินทร์</b>
                  <p><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;ในกรณีที่ท่านมีข้อสงสัย ข้อเสนอแนะ หรือข้อติชมใดๆ เกี่ยวกับนโยบายการคุ้มครองข้อมูลส่วนบุคคล
                    หรือการปฏิบัติตามนโยบายการคุ้มครองข้อมูลส่วนบุคคลฉบับนี้  มหาวิทยาลัยสงขลานครินทร์ ยินดีที่จะตอบข้อสงสัย รับฟัง
                    ข้อเสนอแนะ และคำติชมทั้งหลาย อันจะเป็นประโยชน์ต่อการปรับปรุงการให้บริการของ มหาวิทยาลัยสงขลานครินทร์ ต่อไป
                    โดยท่านสามารถติดต่อกับ  มหาวิทยาลัยสงขลานครินทร์ ตามที่อยู่ที่ปรากฏข้างล่างนี้
                  </p>
                  <p>
                     มหาวิทยาลัยสงขลานครินทร์<br>
                    15 ถ.กาญจนวณิชย์ อ.หาดใหญ่ จ.สงขลา 90110 <br>
                    โทรศัพท์ 0-7428-2000 <br>
                    โทรสาร 0-7455-8941 <br>
                    Email - saraban@psu.ac.th <br>
                  </p>
                  <br><br />  <br><br />
                  <p style="text-align: right;"> นโยบายการคุ้มครองข้อมูลส่วนบุคคลของ  มหาวิทยาลัยสงขลานครินทร์<br>
                    Privacy Policy of PSU <br>
                    จัดทำเมื่อวันที่ 1 มกราคม 2567
                  </p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn flat @click="accept = false, Policy = false">No</v-btn>
              <v-spacer></v-spacer>
              <v-btn class="white--text" color="deep-purple accent-4" @click="accept = true, Policy = false">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="TermConditionofUse" absolute max-width="900" persistent>
          <v-card>
            <v-card-title class="headline grey lighten-3">
              <h3 class="text-center" style="color: #0165ba; margin-top:35px;">นโยบายเว็บไซต์ของ  มหาวิทยาลัยสงขลานครินทร์</h3>
              <h4 class="text-center">Website Policy of PSU</h4>
            </v-card-title>
            <v-card-text>
              <v-divider></v-divider><br>
              <ol>
                <li>
                  <b>วัตถุประสงค์</b>
                  <ul>
                    <p><br>
                      &nbsp;&nbsp;&nbsp;&nbsp;เว็บไซต์ มหาวิทยาลัยสงขลานครินทร์ได้จัดทำขึ้นเพื่อให้บริการ ในการใช้บริการข้อมูลข่าวสารแก่ประชาชนทั่วไป และ
                      บุคลากรในสังกัด มหาวิทยาลัยสงขลานครินทร์ ผู้ใช้บริการจะอยู่ภายใต้เงื่อนไขและข้อกำหนดดังต่อไปนี้ ผู้ใช้บริการจึงควร
                      ศึกษาเงื่อนไข และ ข้อกำหนดการใช้งานเว็บไซต์ และ/หรือเงื่อนไขและข้อตกลงอื่นใดที่  มหาวิทยาลัยสงขลานครินทร์ ได้แจ้ง
                      ให้ทราบบนเว็บไซต์โดยละเอียดก่อนการเข้าใช้บริการ ทั้งนี้ ในการใช้บริการให้ถือว่าผู้ใช้บริการได้ตกลงที่จะปฏิบัติ
                      ตาม เงื่อนไขและข้อกำหนดการให้บริการที่กำหนดไว้นี้ หากผู้ใช้บริการไม่ประสงค์ที่จะผูกพันตามข้อกำหนดและ
                      เงื่อนไขการให้บริการ ขอความกรุณาท่านยุติการเข้าชมและใช้งานเว็บไซต์นี้ในทันที</p>

                  </ul>
                </li>

                <li>
                  <b>เงื่อนไขและข้อกำหนดการใช้งานเว็บไซต์</b>
                  <ul><br>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      2.1 ผู้ใช้บริการอาจได้รับ เข้าถึง สร้าง ส่งหรือแสดงข้อมูล เช่น ไฟล์ข้อมูล ข้อความลายลักษณ์ อักษร
                      ซอฟต์แวร์คอมพิวเตอร์ ดนตรี ไฟล์เสียง หรือเสียงอื่นๆ ภาพถ่าย วิดีโอ หรือรูปภาพ อื่นๆ โดยเป็นส่วนหนึ่งของ
                      บริการหรือโดยผ่านการใช้บริการ ซึ่งต่อไปนี้จะเรียกว่า “เนื้อหา”
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      2.2 เนื้อหาที่นำเสนอต่อผู้ใช้บริการ อาจได้รับการคุ้มครองโดยสิทธิในทรัพย์สินทางปัญญาของ เจ้าของ
                      เนื้อหานั้น ผู้ใช้บริการไม่มีสิทธิเปลี่ยนแปลงแก้ไข จำหน่ายจ่ายโอนหรือสร้างผลงานต่อเนื่องโดยอาศัยเนื้อหา
                      ดังกล่าวไม่ว่าจะทั้งหมดหรือบางส่วน เว้นแต่ผู้ใช้บริการจะได้รับอนุญาตโดยชัดแจ้งจากเจ้าของเนื้อหานั้น
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      2.3 ผู้ใช้บริการอาจพบเนื้อหาที่ไม่เหมาะสม หรือหยาบคาย อันก่อให้เกิดความไม่พอใจ ภายใต้ความเสี่ยง
                      ของตนเอง
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      2.4  มหาวิทยาลัยสงขลานครินทร์ ทรงไว้ซึ่งสิทธิในการคัดกรอง ตรวจทาน ทำเครื่องหมาย เปลี่ยนแปลง แก้ไข
                      ปฏิเสธ หรือลบเนื้อหาใดๆ ที่ไม่เหมาะสมออกจากบริการ ซึ่ง มหาวิทยาลัยสงขลานครินทร์ อาจจัดเตรียมเครื่องมือในการคัด
                      กรองเนื้อหาอย่างชัดเจน โดยไม่ขัดต่อกฎหมาย กฎ ระเบียบของทางราชการที่เกี่ยวข้อง
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      2.5  มหาวิทยาลัยสงขลานครินทร์ อาจหยุดให้บริการเป็นการชั่วคราวหรือถาวร หรือยกเลิกการให้บริการ แก่
                      ผู้ใช้บริการรายใดเป็นการเฉพาะ หากการให้บริการดังกล่าวส่งผลกระทบต่อผู้ใช้บริการ อื่นๆ หรือขัดแย้งต่อ
                      กฎหมาย โดยไม่ต้องแจ้งให้ผู้ใช้บริการทราบล่วงหน้า
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      2.6 การหยุดหรือการยกเลิกบริการตามข้อ 2.5 ผู้ใช้บริการจะไม่สามารถเข้าใช้บริการ และ เข้าถึง
                      รายละเอียดบัญชีของผู้ใช้บริการ ไฟล์เอกสารใดๆ หรือเนื้อหาอื่นๆ ที่อยู่ในบัญชีของ ผู้ใช้บริการได้
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      2.7 ในกรณีทบ มหาวิทยาลัยสงขลานครินทร์หยุดให้บริการเป็นการถาวร หรือยกเลิกบริการแก่ ผู้ใช้บริการ
                       มหาวิทยาลัยสงขลานครินทร์ มีสิทธิในการลบข้อมูลต่างๆ ที่อยู่ในบัญชีของผู้ใช้บริการได้ โดยไม่ต้องแจ้งให้ผู้ใช้บริการทราบ
                      ล่วงหน้า
                    </p>
                  </ul>
                </li>
                <li>
                  <b>สิทธิ หน้าที่ และความรับผิดชอบของผู้ใช้บริการ</b>
                  <ul><br>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      3.1 ผู้ใช้บริการจะให้ข้อมูลเกี่ยวกับตนเอง เช่น ข้อมูลระบุตัวตนหรือรายละเอียดการติดต่อ ที่ถูกต้อง เป็น
                      จริง และเป็นปัจจุบันเสมอ แก่  มหาวิทยาลัยสงขลานครินทร์อันเป็นส่วนหนึ่งของ กระบวนการลงทะเบียนใช้บริการ หรือการ
                      ใช้บริการที่ต่อเนื่อง
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      3.2 ผู้ใช้บริการจะใช้บริการเว็บไซต์นี้ เพื่อวัตถุประสงค์ที่ได้รับอนุญาตตามข้อกำหนดของ
                       มหาวิทยาลัยสงขลานครินทร์และไม่ขัดต่อกฎหมาย กฎ ระเบียบ ข้อบังคับ หลักปฏิบัติที่เป็นที่ ยอมรับโดยทั่วไป
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      3.3 ผู้ใช้บริการจะไม่เข้าใช้หรือพยายามเข้าใช้บริการหนึ่งบริการใดโดยวิธีอื่น รวมถึงการใช้ วิธีการ
                      อัตโนมัติ (การใช้สคริปต์) นอกจากช่องทางที่  มหาวิทยาลัยสงขลานครินทร์ จัดเตรียมไว้ให้ เว้นแต่ผู้ใช้บริการจะได้รับอนุญาต
                      จาก  มหาวิทยาลัยสงขลานครินทร์ โดยชัดแจ้งให้ทำเช่นนั้นได้
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      3.4 ผู้ใช้บริการจะไม่ทำหรือมีส่วนร่วมในการขัดขวางหรือรบกวนบริการของ มหาวิทยาลัยสงขลานครินทร์ รวมทั้ง
                      เครื่องแม่ข่ายและเครือข่ายที่เชื่อมต่อกับบริการ
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      3.5 ผู้ใช้บริการจะไม่ทำสำเนา คัดลอก ทำซ้ำ ขาย แลกเปลี่ยน หรือขายต่อบริการเพื่อวัตถุประสงค์ใดๆ
                      เว้นแต่ผู้ใช้บริการจะได้รับอนุญาตจาก มหาวิทยาลัยสงขลานครินทร์ โดยชัดแจ้งให้ทำเช่นนั้นได้
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      3.6 ผู้ใช้บริการมีหน้าที่ในการรักษาความลับของรหัสผ่านที่เชื่อมโยงกับบัญชีใดๆ ที่ใช้ในการเข้าถึงบริการ
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      3.7 ผู้ใช้บริการจะเป็นผู้รับผิดชอบแต่เพียงผู้เดียวต่อบุคคลใดๆ รวมถึง  มหาวิทยาลัยสงขลานครินทร์ ในความเสียหาย
                      อันเกิดจากการละเมิดข้อกำหนด
                    </p>
                  </ul>
                </li>
                <li>
                  <b>การเชื่อมโยงกับเว็บไซต์อื่นๆ</b>
                  <ul><br>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      4.1 การเชื่อมโยงไปยังเว็บไซต์อื่นเป็นเพียงการให้บริการเพื่ออำนวยความสะดวกแก่ผู้ใช้บริการ เท่านั้น
                       มหาวิทยาลัยสงขลานครินทร์ มิได้มีส่วนเกี่ยวข้องหรือมีอำนาจควบคุม รับรอง ความถูกต้อง ความน่าเชื่อถือ ตลอดจนความ
                      รับผิดชอบในเนื้อหาข้อมูลของเว็บไซต์นั้น ๆ และ มหาวิทยาลัยสงขลานครินทร์ ไม่รับผิดชอบต่อเนื้อหาใด ๆ ที่แสดงบน
                      เว็บไซต์อื่นที่เชื่อมโยงมายัง เว็บไซต์ของ มหาวิทยาลัยสงขลานครินทร์หรือต่อความเสียหายใด ๆ ที่เกิดขึ้นจากการเข้าเยี่ยมชม
                      เว็บไซต์ดังกล่าวการเชื่อมโยงมายังเว็บไซต มหาวิทยาลัยสงขลานครินทร์
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      4.2 กรณีต้องการเชื่อมโยงมายังเว็บไซต์ของ มหาวิทยาลัยสงขลานครินทร์ผู้ใช้บริการสามารถเชื่อมโยงมายังหน้าแรก
                      ของเว็บไซต์ของ  มหาวิทยาลัยสงขลานครินทร์ได้ โดยแจ้งความประสงค์เป็นหนังสือ แต่หากต้องการเชื่อมโยงมายังหน้าภายใน
                      ของเว็บไซต์นี้ จะต้องได้รับความยินยอมเป็น หนังสือจาก มหาวิทยาลัยสงขลานครินทร์แล้วเท่านั้น และในการให้ความยินยอม
                      ดังกล่าว  มหาวิทยาลัยสงขลานครินทร์ ขอสงวนสิทธิที่จะกำหนดเงื่อนไขใด ๆ ไว้ด้วยก็ได้ ในการที่เว็บไซต์อื่น ที่เชื่อมโยงมายัง
                      เว็บไซต์ของ  มหาวิทยาลัยสงขลานครินทร์ จะไม่รับผิดชอบต่อเนื้อหาใด ๆ ที่แสดงบนเว็บไซต์ที่เชื่อมโยงมายังเว็บไซต์ของ
                      บ มหาวิทยาลัยสงขลานครินทร์หรือต่อความเสียหายใด ๆ ที่เกิดขึ้นจากการใช้เว็บไซต์เหล่านั้น
                    </p>
                  </ul>
                </li>
                <li>
                  <b>การปฏิเสธความรับผิด</b>
                  <ul><br>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      5.1  มหาวิทยาลัยสงขลานครินทร์จะไม่รับผิดต่อความเสียหายใด ๆ รวมถึง ความเสียหาย สูญเสียและค่าใช้จ่ายที่
                      เกิดขึ้นไม่ว่าโดยตรงหรือโดยอ้อม ที่เป็นผลหรือสืบเนื่องจากการที่ผู้ใช้เข้าใช้เว็บไซต์นี้หรือเว็บไซต์ที่เชื่อมโยงกับ
                      เว็บไซต์นี้ หรือต่อความเสียหาย สูญเสียหรือค่าใช้จ่ายที่ เกิดจากความล้มเหลวในการใช้งาน ความผิดพลาด การละ
                      เว้น การหยุดชะงัก ข้อบกพร่อง ความไม่สมบูรณ์ คอมพิวเตอร์ไวรัส ถึงแม้ว่า  มหาวิทยาลัยสงขลานครินทร์จะได้รับแจ้งว่า
                      อาจจะ เกิดความเสียหาย สูญเสียหรือค่าใช้จ่ายดังกล่าวขึ้น นอกจากนี้  มหาวิทยาลัยสงขลานครินทร์ไม่รับผิดต่อผู้ใช้เว็บไซต์
                      หรือบุคคลจากการเรียกร้องใด ๆ ที่เกิดขึ้นจากบนเว็บไซต์ หรือเนื้อหาใด ๆ ซึ่งรวมถึงการตัดสินใจหรือการกระทำ
                      ใด ๆ ที่เกิดจากความเชื่อถือในเนื้อหาดังกล่าวของ ผู้ใช้เว็บไซต์ หรือในความเสียหายใด ๆ ไม่ว่าความเสียหาย
                      ทางตรง หรือทางอ้อม รวมถึงความเสียหายอื่นใดที่อาจเกิดขึ้นได้ผู้ใช้บริการยอมรับและตระหนักดีว่า
                       มหาวิทยาลัยสงขลานครินทร์จะไม่ต้องรับผิดชอบต่อการกระทำใดของผู้ใช้บริการทั้งสิ้น
                    </p>
                  </ul>
                </li>
                <li>
                  <b>กรรมสิทธิ์และสิทธิในทรัพย์สินทางปัญญา</b>
                  <ul><br>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      6.1  มหาวิทยาลัยสงขลานครินทร์หรือผู้ให้อนุญาตแก่ มหาวิทยาลัยสงขลานครินทร์เป็นผู้มีสิทธิตามกฎหมายแต่ เพียงผู้เดียวใน
                      กรรมสิทธิ์ ผลประโยชน์ทั้งหมด รวมถึงสิทธิในทรัพย์สินทางปัญญาใดๆ ที่มี อยู่ในบริการซึ่ง  มหาวิทยาลัยสงขลานครินทร์ หรือ
                      ผู้ให้อนุญาตแก่  มหาวิทยาลัยสงขลานครินทร์ เป็นผู้จัดทำขึ้น ไม่ว่าสิทธิเหล่านั้นจะได้รับการจดทะเบียนไว้หรือไม่ก็ตาม
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      6.2 ผู้ใช้บริการจะต้องไม่เปิดเผยข้อมูลที่  มหาวิทยาลัยสงขลานครินทร์ กำหนดให้เป็นความลับ โดยไม่ได้รับความ
                      ยินยอมเป็นลายลักษณ์อักษรล่วงหน้าจาก  มหาวิทยาลัยสงขลานครินทร์
                    </p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      6.3 ผู้ใช้บริการจะต้องไม่ใช้ชื่อทางการค้า เครื่องหมายการค้า เครื่องหมายการบริการ ตราสัญลักษณ์ ชื่อ
                      โดเมนของ  มหาวิทยาลัยสงขลานครินทร์ โดยไม่ได้รับความยินยอมเป็นลายลักษณ์อักษรจาก มหาวิทยาลัยสงขลานครินทร์
                    </p>
                  </ul>
                </li>
                <li>
                  <b>กฎหมายที่ใช้บังคับ</b>
                  <ul><br>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;
                      7.1 การตีความ และการบังคับตามเงื่อนไขการให้บริการฉบับนี้ ให้เป็นไปตามกฎหมายไทย
                    </p>
                  </ul>
                </li>
              </ol>
                <br><br><br><br>
                  <p style="text-align: right;">
                    นโยบายเว็บไซต์ของ  มหาวิทยาลัยสงขลานครินทร์<br>
                    Website Policy of PSU <br>
                    จัดทำเมื่อวันที่ 1 มกราคม 2567
                  </p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn flat @click="accept = false, TermConditionofUse = false">No</v-btn>
              <v-spacer></v-spacer>
              <v-btn class="white--text" color="deep-purple accent-4" @click="accept = true, TermConditionofUse = false">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog> -->
      </div>
    </v-container>
  </v-dialog>
</template>

<script>
  import { Encode, Decode } from "@/services";
  import twoauthen from "@/components/auth/twoauthen";
  import consent from "@/components/auth/consent";

  export default {
    components: {
      twoauthen,
      consent
    },
    data() {
      return {

        // dialog: false,
        dialogPolicy: false,
        loader: null,
        loading2: false,
        currentPage: 0,
        pageCount: 0,
        dialogm1: "",
        TermConditionofUse: false,
        Policy: false,
        accept: false,
        checkbox: true,
        file_name: "",
        mongo_id: "",
        buttonKey: 1,
         rules: {
        email: v => (v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => (v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
        required: v => !!v || 'This field is required'
      }
      };
    },
    watch: {
    },
       created() {
      // this.getConsent()
    },
  mounted() {
    // this.getConsent();


  },
    computed: {
      userData() {
        if (this.$cookies.isKey("information")) {
          return JSON.parse(Decode.decode(this.$cookies.get("information")));
        } else {
          return "";
        }
      },
      dataSave: {
        get() {
          return this.$store.getters.dataPolicy;
        }
      },
      status: {
        get() {
          return this.$store.getters.statusPolicy;
        }
      }
    },
    methods: {

      dataUser(data) {
        // this.loading();
        // this.dialog = false
        this.status = "login";
        // this.getPdf()
        // console.log(data);
        if (this.accept === true) {
          // alert('กด')
          if (this.checkbox === true) {
            this.$emit("dataUser", 1);
          } else {
            this.$emit("dataUser", 0);
          }
        } else {
          this.$swal("Please click accept", "", "warning");
        }
      },
      updatePolicy() {
        // this.status = 'login'
        // this.getPdf()
        // this.dialog = false
        if (this.accept === true) {
          // alert('กด2')
          this.axios.post(process.env.VUE_APP_API_BACKEND + '/acceptNewConsent',
            { 'user_id': Encode.encode(this.dataSave.data.user_id) }).then(response => {
              // alert(response.data.status)
              if (response.data.status === 'Accept Success') {
                if (this.dataSave.data.two_factor_authen === 'on') {
                  this.$refs.twoauthen.open(this.dataSave.data)
                } else {
                  this.$swal('Accept Success', '', 'success')
                  this.$cookies.set('information', Encode.encode(JSON.stringify(this.dataSave.data)), null, '/', process.env.DOMAIN)
                  // this.$cookies.set('usertype', Encode.encode(JSON.stringify(result.type_user)), null, '/', process.env.DOMAIN)
                  this.$router.push('/')
                  // this.forgotPass = false
                  this.reloadPage()
                }
              }
            })
        } else {
          this.$swal('Please click accept', '', 'warning')
        }
      },
      goToPrivacy() {
        // this.$router.push(`/home/PrivacyPolicy`)
        let routeData = this.$router.resolve("/home/PrivacyPolicy");
        window.open(routeData.href);
      },
      goToTerm() {
        // this.$router.push(`/home/TermConditionofUse`)
        let routeData = this.$router.resolve("/home/TermConditionofUse");
        window.open(routeData.href);
      },
      // getConsent() {
      //     this.axios.get(process.env.VUE_APP_API_BACKEND + '/getConsent',{
      //     responseType: 'blob' //Force to receive data in a Blob Format
      //     })
      //     .then((response)=>{
      //       // console.log(response.data);
      //      const file = new Blob([response.data],{type: 'application/pdf'});
      //       // console.log("test")
      //       // console.log(file);
      //       // console.log("test1")
      //       const fileURL = URL.createObjectURL(file);
      //       // console.log(fileURL);
      //       //  window.open(fileURL, "Consent-Frame");
      //       const a = document.createElement("a")
      //             a.href = fileURL
      //             a.target = "ConsentFrame"
      //             a.click()
      //        return fileURL;

      //     })

      // },

      updatePolicyAdmin() {
        if (this.$store.getters.statusPolicy === 'updateAdmin') {
          // this.dialog = false
          if (this.accept === true) {
            this.axios.post(process.env.VUE_APP_API_BACKEND + '/acceptNewConsent',
              { 'user_id': Encode.encode(this.dataSave.data.user_id) }).then(response => {
                // alert(response.data.status)

                if (response.data.status === 'Accept Success') {
                  this.$swal('Accept Success', '', 'success')
                  $('#update').css('display', 'none')
                  this.dialogPolicy = false
                  // console.log(this.dataSave.data);
                  if (this.dataSave.data.two_factor_authen === 'on') {
                    this.$refs.twoauthen.open(this.dataSave.data)
                  } else {
                    this.$cookies.set('information', Encode.encode(JSON.stringify(this.dataSave.data)), null, '/', process.env.DOMAIN)
                    // this.$cookies.set('usertype', Encode.encode(JSON.stringify(result.type_user)), null, '/', process.env.DOMAIN)
                    this.$router.push('/')
                    // this.forgotPass = false
                    this.reloadPage()
                  }
                  //
                }
              })
          } else {
            this.$swal('Please click accept', '', 'warning')
          }
        }
      },

      goToCookies() {
        // this.$router.push(`/home/CookiesPolicy`)
        let routeData = this.$router.resolve("/home/CookiesPolicy");
        window.open(routeData.href);
      },
      goToPrivacy() {
        // this.$router.push(`/home/PrivacyPolicy`)
        let routeData = this.$router.resolve("/home/PrivacyNotice");
        window.open(routeData.href);
      },
      reloadPage() {
        window.location.reload();
      },
      loading() {
        this.$refs.loading.open();
      },
      open() {
        this.dialogPolicy = true
      }
    }
  };
</script>

<style lang="css" scoped="">
  @import url('https://fonts.googleapis.com/css?family=Kanit&display=swap');

  .ppp {
    overflow-y: scroll;
  }

  .text-center {
    text-align: center;
  }

  .text-policy {
    /* font-family: 'Kanit' !important; */
    background-color: #ffffff;
  }

  .font-size,
  b,
  p,
  dd,
  li {
    font-size: 12px !important;
  }

  >>>label.v-label.theme--light {
    font-size: 14px;
  }

  .FixHead {
    overflow-y: auto;
    /* height: 600px; */
    position: sticky;
    top: 0;
    background-color: #ffffff;
    margin-top: 5px;

  }

  .footer {
    position: sticky;
    bottom: 0;
    /* margin-top: 5px; */
    background-color: #ffffff;
  }

  /* scrollbar */
  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }

  .container {
    background: #ffffff;
  }

  >>>table {
    border-collapse: collapse;
    font-size: 12px;
  }

  .pt-10 {
    padding: 10px;
  }

  .color-th {
    height: 35px;
    background-color: #ffc000
  }

  .table-center {
    display: block;
    margin: 0px auto;
  }

  dt {
    font-size: 12px;
  }

  .font-size {
    font-size: 12px;
  }

  .text-center {
  text-align: center;
}
</style>
