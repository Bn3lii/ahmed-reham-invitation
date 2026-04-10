import connectToDatabase from "@/lib/mongodb";
import Message from "@/lib/models/Message";

export const dynamic = "force-dynamic"; // عشان يجيب الداتا جديدة دايماً وميعملش كاش

export default async function MessagesDashboard() {
  await connectToDatabase();
  // نجيب الرسايل من الأحدث للأقدم
  const messages = await Message.find().sort({ createdAt: -1 });

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-script text-primary text-center mb-2">
          Guest Messages
        </h1>
        <p className="text-center text-primary/60 mb-10 text-sm uppercase tracking-widest">
          All the lovely words from your guests
        </p>

        <div className="grid gap-6">
          {messages.length === 0 ? (
            <div className="text-center p-10 bg-white rounded-2xl border border-primary/10">
              <p className="text-primary/60">No messages yet.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg._id.toString()}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-primary/10"
              >
                <h3 className="font-semibold text-xl text-primary mb-3">
                  {msg.name}
                </h3>
                <p className="text-primary/80 whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </p>
                <div className="mt-6 pt-4 border-t border-primary/5 flex justify-end">
                  <p className="text-xs text-primary/40 tracking-wider">
                    {new Date(msg.createdAt).toLocaleString("en-EG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
