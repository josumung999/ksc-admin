// import React, { useState } from "react";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { mutate } from "swr";
// import { AuthStore } from "@/store/authStore";
// import { Trash } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
// import { clientType } from "@/types/clientType";

// interface DeleteClientButtonProps {
//   client: clientType;
// }

// const DeleteClientButton: React.FC<DeleteClientButtonProps> = ({ client }) => {
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);
//   const { user } = AuthStore.useState();

//   async function deleteUser() {
//     try {
//       setLoading(true);
//       const response = await axios.delete(`/api/v1/clients/${client.id}`, {
//         headers: {
//           Authorization: `Bearer ${user?.token}`,
//         },
//       });
//       toast({
//         title: response.data.message ?? "Supprimé avec succès",
//       });
//       setOpen(false);
//       mutate(`/api/v1/clients`);
//     } catch (error: any) {
//       console.log("Error", error);
//       toast({
//         title: error?.response?.data?.message ?? "Une erreur s'est produite",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger asChild>
//         <Button
//           variant="outline"
//           size="icon"
//           className="border-none hover:text-meta-1"
//         >
//           <Trash className="h-5 w-5" />
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent className="">
//         <AlertDialogHeader>
//           <AlertDialogTitle>
//             {" "}
//             Etes vous sûr de vouloir supprimer cette catégorie?
//           </AlertDialogTitle>
//           <AlertDialogDescription>
//             Cette action est irreversible
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel className="text-primary-color">
//             Annuler
//           </AlertDialogCancel>
//           <AlertDialogAction
//             className="bg-meta-1 hover:bg-meta-1/70 focus:ring-meta-1"
//             onClick={async (event) => {
//               event.preventDefault();
//               await deleteUser();
//             }}
//             disabled={loading}
//           >
//             {loading ? null : <Trash className="h-5 w-5" />}
//             <span>{loading ? "Veuillez patienter" : "Supprimer"}</span>
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

// export default DeleteClientButton;
