import { Attendance } from "@/app/lib/definitions";
import Estrella from "./estrella";
import { revalidatePath } from "next/cache";
import { updateAttendace } from "@/app/lib/actions";
export default async function Puntaje({ attendance, id_user }: { attendance: Attendance,id_user:number }) {
    const array = [0,1,2,3,4]
    const handleUpdate = async (data: FormData) => {
            "use server";
            const punto = data.get("punto");
            console.log(punto)
            switch (punto) {
                case "0":
                    if(attendance.estrella>1){
                        attendance.estrella=1
                    }else{
                        if(attendance.estrella==1){
                            attendance.estrella=0
                        }else{
                            attendance.estrella=1
                        }
                    }
                    break;
                case "1":
                    attendance.estrella=2
                    break;
                case "2":
                    attendance.estrella=3
                    break;
                case "3":
                    attendance.estrella=4
                    break;
                case "4":
                    attendance.estrella=5
                    break;
            }
            updateAttendace(
                id_user,
                attendance.id_client,
                attendance.asistencia,
                attendance.puntualidad,
                attendance.escrituras,
                attendance.lectura,
                attendance.otro,
                attendance.estrella,
                attendance.fecha_numero);
            revalidatePath('/estrella');
            
        };
    return (
        <div className="flex items-center gap-2">
            {
                array?.map((a)=>(
                <form action={handleUpdate} key={"b"+a+attendance.apellidos_nombres}>
                    <input key={a+attendance.apellidos_nombres} name="punto" className='hidden' defaultValue={String(a)} />
                    {attendance.estrella > a ?
                        <><Estrella status="yes" />
                        </> : <><Estrella status="no" /></>
                    }
                </form>
                ))
            }
            
            <p className="text-xl font-medium md:hidden">
                = {attendance.estrella}
            </p>
        </div>
    )
}